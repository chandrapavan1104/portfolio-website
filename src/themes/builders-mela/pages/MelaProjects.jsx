import React, { useMemo, useState } from "react";
import MelaSection from "../components/MelaSection";
import ProjectPavilion from "../components/ProjectPavilion";
import { featuredProjectNames, getMelaProjects } from "../melaData";

const filters = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "cloud", label: "Cloud" },
  { id: "archive", label: "Archive" },
];

function projectMatches(project, activeFilter) {
  if (activeFilter === "all") {
    return true;
  }

  const text = `${project.name} ${project.description} ${(project.techStack || []).join(
    " "
  )}`.toLowerCase();

  if (activeFilter === "ai") {
    return /ai|llm|rag|langchain|whisper|openai|agent|semantic|vector/.test(text);
  }
  if (activeFilter === "cloud") {
    return /aws|cloud|gcp|docker|kubernetes|firebase|cloud run|rds/.test(text);
  }
  if (activeFilter === "fullstack") {
    return /react|next|angular|node|express|fastapi|django|flask/.test(text);
  }

  return !featuredProjectNames.includes(project.name);
}

function MelaProjects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const projects = getMelaProjects();

  const filteredProjects = useMemo(
    () => projects.filter((project) => projectMatches(project, activeFilter)),
    [activeFilter, projects]
  );

  return (
    <div className="mela-page">
      <MelaSection
        eyebrow="Project Showcase"
        title="Each Project Has A Working System Inside"
        className="mela-page-heading-section"
      >
        <div className="mela-filter-row" aria-label="Project filters">
          {filters.map((filter) => (
            <button
              type="button"
              className={activeFilter === filter.id ? "active" : ""}
              onClick={() => setActiveFilter(filter.id)}
              key={filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </MelaSection>

      <section className="mela-pavilion-grid">
        {filteredProjects.map((project, index) => (
          <ProjectPavilion
            project={project}
            index={index}
            featured={featuredProjectNames.includes(project.name)}
            key={project.name}
          />
        ))}
      </section>
    </div>
  );
}

export default MelaProjects;
