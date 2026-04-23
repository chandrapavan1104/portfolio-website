import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AiOutlineSend } from "react-icons/ai";
import portfolio from "../../../Portfolio";

const CHAT_HISTORY_KEY = "buildersMelaGuideMessages";
const DEFAULT_ASSISTANT_MESSAGE = {
  role: "assistant",
  content:
    "Welcome to the build grounds. Ask me about Chandra's projects, AI work, backend systems, cloud deployments, or resume.",
};

const starterPrompts = [
  "Walk me through Chandra's AI projects",
  "Which projects show backend depth?",
  "Summarize the AppMela idea",
  "What makes him useful on a product team?",
];

function parseSseEventData(event) {
  const lines = event.split(/\r?\n/);
  const dataLines = [];

  for (const line of lines) {
    if (line.startsWith("data:")) {
      dataLines.push(line.replace(/^data:\s?/, ""));
    } else if (line.trim() !== "") {
      dataLines.push(line);
    }
  }

  return dataLines.length ? dataLines.join("\n") : null;
}

function MelaGuide() {
  const apiUrl =
    import.meta.env.VITE_CHATBOT_API_URL ||
    "https://profile-bot-api-usc-977721269659.us-central1.run.app/ask";
  const streamUrl = apiUrl.endsWith("/ask") ? `${apiUrl}/stream` : apiUrl;
  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") {
      return [DEFAULT_ASSISTANT_MESSAGE];
    }

    try {
      const stored = sessionStorage.getItem(CHAT_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fall through to the default conversation.
    }

    return [DEFAULT_ASSISTANT_MESSAGE];
  });
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const endOfChatRef = useRef(null);
  const firstName = portfolio.name?.split(" ")[0] || "You";

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      sessionStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage errors.
    }
  }, [messages]);

  const replaceAssistantContent = (content) => {
    setMessages((prev) => {
      if (!prev.length) {
        return prev;
      }
      const next = [...prev];
      const lastIndex = next.length - 1;
      if (next[lastIndex].role !== "assistant") {
        return next;
      }
      next[lastIndex] = { ...next[lastIndex], content };
      return next;
    });
  };

  const appendAssistantContent = (chunk) => {
    if (!chunk) {
      return;
    }

    setMessages((prev) => {
      const next = [...prev];
      const lastIndex = next.length - 1;
      if (next[lastIndex]?.role !== "assistant") {
        return next;
      }
      next[lastIndex] = {
        ...next[lastIndex],
        content: `${next[lastIndex].content}${chunk}`,
      };
      return next;
    });
  };

  const submitQuery = async (query) => {
    const cleanQuery = query.trim();
    if (!cleanQuery || isSubmitting) {
      return;
    }

    const historyMessages = messages;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: cleanQuery },
      { role: "assistant", content: "" },
    ]);
    setInput("");
    setIsSubmitting(true);

    try {
      const payload = { query: cleanQuery, messages: historyMessages };
      if (sessionId) {
        payload.session_id = sessionId;
      }

      const response = await fetch(streamUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      if (!response.body || contentType.includes("application/json")) {
        const data = await response.json();
        if (data?.session_id) {
          setSessionId(data.session_id);
        }
        replaceAssistantContent(
          data?.answer ||
            data?.response ||
            "I do not have a grounded answer for that yet."
        );
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let doneStreaming = false;

      while (!doneStreaming) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          const data = parseSseEventData(event);
          if (!data) {
            continue;
          }
          if (data === "[DONE]") {
            doneStreaming = true;
            break;
          }
          appendAssistantContent(data);
        }
      }
    } catch {
      replaceAssistantContent(
        "The guide could not reach the profile assistant right now. Try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuery(input);
  };

  return (
    <section className="mela-guide-page">
      <div className="mela-guide-header">
        <p className="mela-kicker">AI Guide</p>
        <h1>Ask The AI Guide About The Work</h1>
        <div className="mela-prompt-row">
          {starterPrompts.map((prompt) => (
            <button
              type="button"
              onClick={() => submitQuery(prompt)}
              disabled={isSubmitting}
              key={prompt}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="mela-guide-window">
        <div className="mela-guide-messages">
          {messages.map((message, index) => (
            <article
              className={`mela-guide-message mela-guide-${message.role}`}
              key={`${message.role}-${index}`}
            >
              <span>{message.role === "assistant" ? "AI Guide" : firstName}</span>
              <div>
                <ReactMarkdown>{String(message.content)}</ReactMarkdown>
              </div>
            </article>
          ))}
          <div ref={endOfChatRef} />
        </div>

        <form className="mela-guide-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isSubmitting}
            placeholder="Ask about projects, skills, AppMela, or resume..."
          />
          <button type="submit" disabled={isSubmitting || !input.trim()}>
            <AiOutlineSend />
            <span>{isSubmitting ? "Thinking" : "Send"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default MelaGuide;
