import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

function ProjectPavilion({ project, index, featured = false }) {
  const stack = project.techStack || project.stack || [];
  const district = project.category || stack[0] || "software";

  return (
    <article
      className={`mela-pavilion ${featured ? "mela-pavilion-featured" : ""}`}
      style={{ "--stall-index": index }}
    >
      <div className="mela-pavilion-topline">
        <span className="mela-stall-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mela-district">{district}</span>
      </div>

      <h3>{project.name}</h3>
      <p>{project.description}</p>

      {stack.length > 0 && (
        <div className="mela-stack-list" aria-label={`${project.name} stack`}>
          {stack.slice(0, featured ? 8 : 5).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      )}

      <div className="mela-pavilion-actions">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer">
            <BsGithub />
            <span>Source</span>
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">
            <AiOutlineArrowRight />
            <span>Live</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectPavilion;
