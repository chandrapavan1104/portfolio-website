// Registry of projects that are open for anonymous feedback.
//
// Adding a project here is all it takes to publish /feedback/<slug> and give it
// a card on the Building wall. Every submission is stamped with the slug, so
// responses stay separated per project.

export const feedbackProjects = [
  {
    slug: "code-as-a-chat",
    name: "Code-as-a-Chat",
    status: "building now",
    tone: "gold",
    tagline: "Your Mac is the server. Your phone is the terminal. The language is English.",
    summary:
      "An always-on dev server running on my own Mac that I drive entirely from my phone in plain English. Claude Code, Codex and Gemini run as full agentic CLIs on my hardware — not a model router — so the code never leaves the machine.",
    askingFor:
      "I want to know whether the core bet holds up: is driving your own dev machine from your pocket something you'd actually use, or a neat demo?",
    pillars: [
      {
        title: "Every coding agent, one chat",
        body: "Claude Code, Codex and Gemini as real agentic CLIs on my own hardware. Switch mid-conversation; each keeps its own preserved context.",
      },
      {
        title: "Remote control of the machine",
        body: "Lock, sleep, screenshot, notify, connect a keyboard — over an encrypted private tunnel, no cloud middleman.",
      },
      {
        title: "Codaur — usage on one screen",
        body: "Live 5-hour and weekly limits, tokens and plan for every model. Three dashboards collapsed into one.",
      },
      {
        title: "Brain Dump",
        body: "Dump a rough idea, and it becomes a scaffolded project — wired up, deployed and tested. From your phone.",
      },
      {
        title: "Private and featherweight",
        body: "A single FastAPI process. Local SQLite, token-gated API, optional PII masking. No Node gateway, no Docker, no runtime zoo.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "SQLite",
      "Claude Code",
      "Codex",
      "Gemini CLI",
      "Tailscale",
      "macOS",
    ],
    screenshots: [
      { src: "/projects/code-as-a-chat/dashboard.jpg", label: "Dashboard" },
      { src: "/projects/code-as-a-chat/chat.jpg", label: "Chat with Gajala" },
      { src: "/projects/code-as-a-chat/codaur.jpg", label: "Codaur — live usage" },
      { src: "/projects/code-as-a-chat/mac.jpg", label: "Mac control" },
    ],
    links: {
      github: "",
      demo: "",
    },
    highlightOptions: [
      { value: "agents", label: "All three agents in one chat" },
      { value: "remote", label: "Remote control of the Mac" },
      { value: "codaur", label: "Codaur usage dashboard" },
      { value: "braindump", label: "Brain Dump → deployed app" },
      { value: "private", label: "Local-first / privacy" },
      { value: "lightweight", label: "One process, no Docker" },
    ],
    missingPrompt: "What is missing, or what would stop you using this?",
    missingPlaceholder:
      "Be blunt. A dealbreaker is more useful to me than a compliment.",
  },
];

export function getFeedbackProject(slug) {
  return feedbackProjects.find((project) => project.slug === slug) || null;
}

export function getFeedbackSlugForProject(projectName) {
  if (!projectName) {
    return null;
  }

  const normalized = projectName.trim().toLowerCase();
  const match = feedbackProjects.find(
    (project) => project.name.trim().toLowerCase() === normalized
  );

  return match ? match.slug : null;
}
