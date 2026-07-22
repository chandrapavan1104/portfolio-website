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
        body: "Claude Code, Codex and Gemini run as real agentic CLIs on my hardware — not a model router. Switch engine or model mid-conversation and each keeps its own thread; if one hits a rate limit it falls back to a backup model, so the chat never dies.",
      },
      {
        title: "It fixes its own bugs",
        body: "Describe a problem from your phone — attach a screenshot — and it diagnoses against the live codebase, patches on a branch and rebuilds the app into a one-tap update. Risky server changes are gated for your OK, health-checked on restart and auto-rolled-back if they don't boot, so a bad fix can't lock you out.",
      },
      {
        title: "Remote control of the machine",
        body: "Lock, wake, sleep, screenshot, webcam, notify, connect a keyboard — over an encrypted private tunnel, no cloud middleman. Your Mac obeys plain-English commands from anywhere.",
      },
      {
        title: "Codaur — usage on one screen",
        body: "Live 5-hour and weekly limits, tokens and plan for every model, refreshed as you watch. Three provider dashboards collapsed into one glance.",
      },
      {
        title: "Brain Dump",
        body: "Fire a rough idea, bug or todo at it from your phone and it lands as a living note the agent can pick up later — your scratchpad and your backlog in the same place you already talk to it.",
      },
      {
        title: "Private and featherweight",
        body: "One FastAPI process, local SQLite and a token-gated API — your code and data never leave the Mac. No Node gateway, no Docker, no runtime zoo.",
      },
    ],
    roadmap: [
      {
        title: "Brain Dump → shipped app",
        body: "A rough idea becomes a scaffolded project — wired up, deployed and tested. The ship pipeline already exists for fixes; next it runs greenfield.",
      },
      {
        title: "On-device PII / PCI masking",
        body: "Optional redaction so sensitive strings are masked on the Mac before anything is handed to a model.",
      },
      {
        title: "CI + a real release channel",
        body: "Automated checks on every change and a cleaner path from build to your phone.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "SQLite",
      "Flutter",
      "Claude Code",
      "Codex",
      "Gemini CLI",
      "Tailscale",
      "Firebase",
      "macOS",
    ],
    screenshots: [
      { src: "/projects/code-as-a-chat/dashboard.jpg", label: "Dashboard" },
      { src: "/projects/code-as-a-chat/chat.jpg", label: "Chat with Gajala" },
      {
        src: "/projects/code-as-a-chat/skills.jpg",
        label: "Skills — pin what you use",
      },
      { src: "/projects/code-as-a-chat/system.jpg", label: "Live system stats" },
    ],
    links: {
      github: "",
      demo: "",
    },
    highlightOptions: [
      { value: "agents", label: "All three agents in one chat" },
      { value: "selfheal", label: "It fixes its own bugs" },
      { value: "remote", label: "Remote control of the Mac" },
      { value: "codaur", label: "Codaur usage dashboard" },
      { value: "braindump", label: "Brain Dump" },
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
