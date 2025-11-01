import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import portfolio from "../../Portfolio";

function Chatbot() {
  const apiUrl =
    import.meta.env.VITE_CHATBOT_API_URL ||
    "https://profile-bot-api-977721269659.us-west2.run.app/ask";
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm Chandra Pavan's AI assistant. Ask me anything about his experience, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const endOfChatRef = useRef(null);
  const firstName = portfolio.name?.split(" ")[0] || "You";

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const query = input.trim();
    if (!query) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setInput("");
    setIsSubmitting(true);

    try {
      const payload = { query };
      if (sessionId) {
        payload.session_id = sessionId;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data?.session_id) {
        setSessionId(data.session_id);
      }
      const answer =
        data?.answer ||
        data?.response ||
        "I'm not sure how to answer that yet, but Chandra keeps teaching me new things!";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I ran into a hiccup while fetching the answer. Please try asking again in a moment.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="chatbot-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="chatbot-header">
              <h1>
                Meet <span className="purple">{portfolio.name}</span>&apos;s AI
                Assistant
              </h1>
              <p>
                Curious about my background, skills, or the projects I&apos;ve
                built? Just ask away and the assistant will help you out.
              </p>
            </div>
            <div className="chatbot-window">
              <div className="chatbot-messages">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`chatbot-message chatbot-message-${message.role}`}
                  >
                    <div className="chatbot-message-label">
                      {message.role === "assistant"
                        ? "Assistant"
                        : firstName}
                    </div>
                    <div className="chatbot-message-content">
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={endOfChatRef} />
              </div>
              <Form onSubmit={handleSubmit} className="chatbot-form">
                <Form.Control
                  type="text"
                  placeholder="Ask anything about Chandra Pavan..."
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        animation="border"
                        role="status"
                        size="sm"
                        className="me-2"
                      />
                      Thinking...
                    </>
                  ) : (
                    "Ask"
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Chatbot;
