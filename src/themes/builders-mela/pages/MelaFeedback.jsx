import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  AiOutlineArrowRight,
  AiOutlineCheckCircle,
  AiOutlineFileText,
  AiOutlineLoading3Quarters,
  AiOutlineRobot,
} from "react-icons/ai";
import { BsGithub, BsShieldLock } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import portfolio from "../../../Portfolio";
import { getFeedbackProject } from "../feedbackProjects";
import { readRef, submitFeedback } from "../../../lib/feedbackStore";
import { isFirebaseConfigured } from "../../../lib/firebaseConfig";

const COOLDOWN_MS = 10 * 60 * 1000;

const roleOptions = [
  { value: "developer", label: "Developer" },
  { value: "hiring", label: "Hiring / recruiting" },
  { value: "founder", label: "Founder" },
  { value: "curious", label: "Just curious" },
];

const useOptions = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No" },
];

const ratingLabels = {
  1: "Not for me",
  2: "Needs work",
  3: "Interesting",
  4: "Would try it",
  5: "Want it now",
};

const emptyAnswers = {
  rating: 0,
  role: "",
  wouldUse: "",
  highlights: [],
  missing: "",
  extra: "",
  contact: "",
};

function cooldownKey(slug) {
  return `melaFeedbackSent:${slug}`;
}

function hasRecentlySubmitted(slug) {
  try {
    const sent = Number(localStorage.getItem(cooldownKey(slug)));
    return Boolean(sent) && Date.now() - sent < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function MelaFeedback() {
  const { slug } = useParams();
  const project = getFeedbackProject(slug);

  const [answers, setAnswers] = useState(emptyAnswers);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const panelRef = useRef(null);

  const ref = useMemo(() => readRef(), []);

  const otherProjects = useMemo(() => {
    const projects = portfolio.projects || [];
    return projects
      .filter((item) => item.name !== project?.name)
      .slice(0, 3);
  }, [project]);

  useEffect(() => {
    if (project && hasRecentlySubmitted(project.slug)) {
      setStatus("done");
    }
  }, [project]);

  if (!project) {
    return <Navigate to="/building" replace />;
  }

  const setAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleHighlight = (value) => {
    setAnswers((prev) => {
      const active = prev.highlights.includes(value);
      return {
        ...prev,
        highlights: active
          ? prev.highlights.filter((item) => item !== value)
          : [...prev.highlights, value].slice(0, 8),
      };
    });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    // Bots fill hidden fields; humans never see this one.
    if (honeypot) {
      setStatus("done");
      return;
    }

    if (!answers.rating) {
      setError("Pick a rating first — everything else is optional.");
      return;
    }

    setError("");
    setStatus("sending");

    try {
      await submitFeedback({ projectSlug: project.slug, answers, ref });

      try {
        localStorage.setItem(cooldownKey(project.slug), String(Date.now()));
      } catch {
        // A blocked localStorage only costs us the resubmit guard.
      }

      setStatus("done");
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (submitError) {
      setStatus("idle");

      const reason = submitError?.message;
      let message = "That did not send. Check your connection and try once more.";

      if (reason === "firebase-not-configured") {
        message = "Feedback is not wired up yet. Try again shortly.";
      } else if (reason === "write-timeout") {
        // Firestore may still flush the queued write later, so this deliberately
        // does not claim the submission was lost.
        message =
          "This is taking longer than it should. Your answers may not have reached me — try again in a moment.";
      }

      setError(message);
    }
  };

  const isSending = status === "sending";
  const isDone = status === "done";

  return (
    <div className="mela-page mela-feedback-page">
      <section className="mela-section mela-page-heading-section mela-feedback-hero">
        <p className="mela-kicker">Feedback · {project.status}</p>
        <h1>{project.name}</h1>
        <p className="mela-feedback-tagline">{project.tagline}</p>
        <p className="mela-feedback-summary">{project.summary}</p>

        <div className="mela-feedback-hero-actions">
          <button
            type="button"
            className="mela-action mela-action-primary"
            onClick={scrollToForm}
          >
            <AiOutlineArrowRight />
            <span>Leave anonymous feedback</span>
          </button>
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="mela-action"
            >
              <BsGithub />
              <span>Source</span>
            </a>
          )}
        </div>
      </section>

      <div className="mela-feedback-layout">
        <div className="mela-feedback-content">
          {project.screenshots?.length > 0 && (
            <section className="mela-feedback-block">
              <h2>What it looks like</h2>
              <div className="mela-shot-strip">
                {project.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    <img src={shot.src} alt={shot.label} loading="lazy" />
                    <figcaption>{shot.label}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="mela-feedback-block">
            <h2>What is actually built</h2>
            <div className="mela-pillar-grid">
              {project.pillars.map((pillar, index) => (
                <article className="mela-pillar" key={pillar.title}>
                  <span className="mela-stall-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </section>

          {project.roadmap?.length > 0 && (
            <section className="mela-feedback-block">
              <h2>What is coming next</h2>
              <ul className="mela-roadmap">
                {project.roadmap.map((item) => (
                  <li className="mela-roadmap-item" key={item.title}>
                    <span className="mela-roadmap-tag">Soon</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.stack?.length > 0 && (
            <section className="mela-feedback-block">
              <h2>Built with</h2>
              <div className="mela-stack-list">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mela-feedback-panel" ref={panelRef}>
          <div className="mela-feedback-panel-inner" ref={formRef}>
            {isDone ? (
              <div className="mela-feedback-done">
                <p className="mela-kicker">
                  <AiOutlineCheckCircle /> Sent anonymously
                </p>
                <h2>Thank you — that genuinely helps.</h2>
                <p>
                  No name, no email, no tracking attached. While you are here,
                  here is the rest of what I have built.
                </p>

                <div className="mela-done-projects">
                  {otherProjects.map((item) => (
                    <article key={item.name}>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      {item.github && (
                        <a href={item.github} target="_blank" rel="noreferrer">
                          <BsGithub />
                          <span>Source</span>
                        </a>
                      )}
                    </article>
                  ))}
                </div>

                <div className="mela-done-actions">
                  <Link to="/chatbot" className="mela-action mela-action-primary">
                    <AiOutlineRobot />
                    <span>Ask the AI Guide about this</span>
                  </Link>
                  <Link to="/project" className="mela-action">
                    <AiOutlineArrowRight />
                    <span>All projects</span>
                  </Link>
                  <Link to="/resume" className="mela-action">
                    <AiOutlineFileText />
                    <span>Resume</span>
                  </Link>
                  {portfolio.socialLinks?.linkedin && (
                    <a
                      href={portfolio.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mela-action"
                    >
                      <FaLinkedinIn />
                      <span>Follow the build</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <form className="mela-feedback-form" onSubmit={handleSubmit}>
                <p className="mela-kicker">Anonymous feedback</p>
                <h2>Tell me what you actually think</h2>
                <p className="mela-feedback-ask">{project.askingFor}</p>

                <fieldset>
                  <legend>How does this land for you?</legend>
                  <div className="mela-rating-row">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        type="button"
                        key={value}
                        className={answers.rating === value ? "active" : ""}
                        onClick={() => setAnswer("rating", value)}
                        aria-pressed={answers.rating === value}
                        aria-label={`${value} out of 5 — ${ratingLabels[value]}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <p className="mela-rating-caption">
                    {answers.rating
                      ? ratingLabels[answers.rating]
                      : "1 = not for me, 5 = want it now"}
                  </p>
                </fieldset>

                <fieldset>
                  <legend>Where are you coming from?</legend>
                  <div className="mela-chip-row">
                    {roleOptions.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        className={answers.role === option.value ? "active" : ""}
                        onClick={() => setAnswer("role", option.value)}
                        aria-pressed={answers.role === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Would you actually use it?</legend>
                  <div className="mela-chip-row">
                    {useOptions.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        className={
                          answers.wouldUse === option.value ? "active" : ""
                        }
                        onClick={() => setAnswer("wouldUse", option.value)}
                        aria-pressed={answers.wouldUse === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Which part is the strongest? Pick any.</legend>
                  <div className="mela-chip-row">
                    {project.highlightOptions.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        className={
                          answers.highlights.includes(option.value)
                            ? "active"
                            : ""
                        }
                        onClick={() => toggleHighlight(option.value)}
                        aria-pressed={answers.highlights.includes(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="mela-field">
                  <span>{project.missingPrompt}</span>
                  <textarea
                    value={answers.missing}
                    onChange={(event) =>
                      setAnswer("missing", event.target.value)
                    }
                    maxLength={2000}
                    rows={4}
                    placeholder={project.missingPlaceholder}
                  />
                </label>

                <label className="mela-field">
                  <span>Anything else?</span>
                  <textarea
                    value={answers.extra}
                    onChange={(event) => setAnswer("extra", event.target.value)}
                    maxLength={2000}
                    rows={3}
                    placeholder="Ideas, comparisons, things I got wrong."
                  />
                </label>

                <label className="mela-field">
                  <span>
                    Email <em>— only if you want a reply. Blank stays anonymous.</em>
                  </span>
                  <input
                    type="email"
                    value={answers.contact}
                    onChange={(event) =>
                      setAnswer("contact", event.target.value)
                    }
                    maxLength={200}
                    placeholder="you@example.com"
                  />
                </label>

                <div className="mela-honeypot" aria-hidden="true">
                  <label>
                    Website
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                    />
                  </label>
                </div>

                {error && <p className="mela-feedback-error">{error}</p>}

                {!isFirebaseConfigured && (
                  <p className="mela-feedback-error">
                    Firebase is not configured yet — add the web config in
                    src/lib/firebaseConfig.js before this can send.
                  </p>
                )}

                <button
                  type="submit"
                  className="mela-action mela-action-primary mela-feedback-submit"
                  disabled={isSending}
                >
                  {isSending ? (
                    <AiOutlineLoading3Quarters className="mela-spin" />
                  ) : (
                    <AiOutlineArrowRight />
                  )}
                  <span>{isSending ? "Sending" : "Send anonymously"}</span>
                </button>

                <p className="mela-feedback-privacy">
                  <BsShieldLock />
                  <span>
                    No account, no cookie, no IP address. Only your answers and
                    the date are stored.
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MelaFeedback;
