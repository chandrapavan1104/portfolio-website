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

export const featuredProjectNames = [
  "AppMela AI",
  "Kirana.ai",
  "Profile Bot",
  "Flight Finder",
  "RBAC Management System",
];
