import portfolio from "../../Portfolio";

export const appMelaProject = {
  name: "AppMela AI",
  category: "current build",
  techStack: [
    "Next.js",
    "Tailwind CSS",
    "FastAPI",
    "Supabase",
    "pgvector",
    "OpenAI",
    "Cloud Run",
  ],
  description:
    "A social app marketplace where developers deploy Docker-based AI apps, users discover what is trending, and an AI deploy agent helps diagnose failed releases.",
  github: "https://github.com/chandrapavan1104/appmela-ai",
  demo: "",
};

export function getMelaProjects() {
  const projects = portfolio.projects || [];
  const hasAppMela = projects.some((project) =>
    project.name?.toLowerCase().includes("appmela")
  );

  return hasAppMela ? projects : [appMelaProject, ...projects];
}

export const skillDistricts = [
  { key: "languages", title: "Programming Languages", tone: "gold" },
  { key: "frontend", title: "Frontend Engineering", tone: "teal" },
  { key: "backend", title: "Backend APIs", tone: "rose" },
  { key: "databases", title: "Databases", tone: "gold" },
  { key: "cloudDevops", title: "Cloud & DevOps", tone: "teal" },
  { key: "aiMl", title: "AI & ML Systems", tone: "rose" },
  { key: "tools", title: "Developer Tools", tone: "gold" },
  { key: "others", title: "System Design", tone: "teal" },
];

// Builds that are live but not ready to be shown. Deliberately unnamed — only
// a cryptic one-line teaser and a district, rendered as sealed stalls.
export const sealedProjects = [
  {
    id: "sealed-spatial",
    district: "spatial",
    teaser: "Turning scattered signals into a picture of where things are.",
  },
  {
    id: "sealed-creators",
    district: "social",
    teaser: "A home for people who make a living being seen.",
  },
  {
    id: "sealed-access",
    district: "accessibility",
    teaser: "Two people, no shared language, still understanding each other.",
  },
  {
    id: "sealed-quiet",
    district: "anonymous",
    teaser: "A quiet place for the words people never send.",
  },
];

// The first three lead the homepage "Current Projects Worth Exploring" section;
// the rest get featured styling on the Projects page. High-value builds first.
export const featuredProjectNames = [
  "Code-as-a-Chat",
  "AppMela AI",
  "Kirana.ai",
  "Codaur",
  "DocxChat",
  "Meeting Notes Helper",
  "Profile Bot",
];
