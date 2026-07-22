import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import MelaSection from "../components/MelaSection";
import { feedbackProjects } from "../feedbackProjects";

function MelaBuilding() {
  return (
    <div className="mela-page">
      <MelaSection
        eyebrow="Build In Public"
        title="What I'm Building Right Now"
        className="mela-page-heading-section"
      >
        <p className="mela-building-intro">
          These are live, in-progress builds rather than finished case studies.
          Each one has an anonymous feedback page — no account, no email, no
          tracking. Tell me what is wrong with it and I will build accordingly.
        </p>
      </MelaSection>

      <section className="mela-pavilion-grid">
        {feedbackProjects.map((project, index) => (
          <article
            className="mela-pavilion mela-pavilion-featured"
            style={{ "--stall-index": index }}
            key={project.slug}
          >
            <div className="mela-pavilion-topline">
              <span className="mela-stall-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mela-district">{project.status}</span>
            </div>

            <h3>{project.name}</h3>
            <p>{project.summary}</p>

            {project.stack?.length > 0 && (
              <div className="mela-stack-list" aria-label={`${project.name} stack`}>
                {project.stack.slice(0, 6).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            )}

            <div className="mela-pavilion-actions">
              <Link to={`/feedback/${project.slug}`}>
                <AiOutlineArrowRight />
                <span>Shape this</span>
              </Link>
              {project.links?.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  <BsGithub />
                  <span>Source</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default MelaBuilding;
