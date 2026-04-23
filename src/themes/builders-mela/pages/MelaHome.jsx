import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineArrowRight,
  AiOutlineCloudServer,
  AiOutlineExperiment,
  AiOutlineRobot,
} from "react-icons/ai";
import { BsGithub, BsLightningCharge } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import portfolio from "../../../Portfolio";
import MelaSection from "../components/MelaSection";
import ProjectPavilion from "../components/ProjectPavilion";
import { featuredProjectNames, getMelaProjects } from "../melaData";

const routeMarkers = [
  { label: "GenAI Agents", icon: <AiOutlineRobot /> },
  { label: "Full-Stack Systems", icon: <AiOutlineCloudServer /> },
  { label: "Cloud Deploys", icon: <BsLightningCharge /> },
  { label: "Product Experiments", icon: <AiOutlineExperiment /> },
];

function MelaHome() {
  const projects = getMelaProjects();
  const featuredProjects = featuredProjectNames
    .map((name) => projects.find((project) => project.name === name))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      <section className="mela-hero">
        <div className="mela-map-stage" aria-hidden="true">
          <div className="mela-map-ring mela-map-ring-one" />
          <div className="mela-map-ring mela-map-ring-two" />
          <div className="mela-route-line mela-route-line-a" />
          <div className="mela-route-line mela-route-line-b" />
          <div className="mela-route-node mela-node-a" />
          <div className="mela-route-node mela-node-b" />
          <div className="mela-route-node mela-node-c" />
          <div className="mela-gate-arch">
            <span>CPR</span>
          </div>
          <div className="mela-floating-sign sign-one">AI</div>
          <div className="mela-floating-sign sign-two">API</div>
          <div className="mela-floating-sign sign-three">UX</div>
        </div>

        <div className="mela-hero-copy">
          <p className="mela-kicker">Software Build Ground</p>
          <h1>{portfolio.name}</h1>
          <p className="mela-title-line">{portfolio.title}</p>
          <p className="mela-hero-subtitle">{portfolio.subTitle}</p>

          <div className="mela-hero-actions">
            <Link to="/project" className="mela-action mela-action-primary">
              <span>View Projects</span>
              <AiOutlineArrowRight />
            </Link>
            <Link to="/chatbot" className="mela-action">
              <AiOutlineRobot />
              <span>Ask AI Guide</span>
            </Link>
          </div>
        </div>

        <aside className="mela-hero-ledger">
          <div>
            <span>Base</span>
            <strong>{portfolio.location}</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>AI apps, APIs, cloud systems</strong>
          </div>
          <div>
            <span>Signal</span>
            <strong>Open to strong engineering roles</strong>
          </div>
          <div className="mela-ledger-links">
            {portfolio.socialLinks?.github && (
              <a href={portfolio.socialLinks.github} target="_blank" rel="noreferrer">
                <BsGithub />
              </a>
            )}
            {portfolio.socialLinks?.linkedin && (
              <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </aside>
      </section>

      <section className="mela-route-strip" aria-label="Build routes">
        {routeMarkers.map((marker) => (
          <div className="mela-route-marker" key={marker.label}>
            <span aria-hidden="true">{marker.icon}</span>
            <strong>{marker.label}</strong>
          </div>
        ))}
      </section>

      <MelaSection eyebrow="Featured Builds" title="Current Projects Worth Exploring">
        <div className="mela-featured-grid">
          {featuredProjects.map((project, index) => (
            <ProjectPavilion
              project={project}
              index={index}
              featured
              key={project.name}
            />
          ))}
        </div>
      </MelaSection>

      <MelaSection eyebrow="Builder Note" title="A Portfolio Built To Keep Expanding">
        <div className="mela-manifesto">
          <p>{portfolio.about}</p>
          <Link to="/about" className="mela-inline-link">
            See the skill map <AiOutlineArrowRight />
          </Link>
        </div>
      </MelaSection>
    </>
  );
}

export default MelaHome;
