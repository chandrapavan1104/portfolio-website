import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import portfolio from "../../../Portfolio";

function MelaFooter() {
  return (
    <footer className="mela-footer">
      <div>
        <p className="mela-kicker">Open For Useful Work</p>
        <h2>Have a system, agent, or app idea that needs a builder?</h2>
      </div>
      <div className="mela-footer-actions">
        <a href={`mailto:${portfolio.email}`} className="mela-action mela-action-primary">
          <AiOutlineMail />
          <span>Email</span>
        </a>
        {portfolio.socialLinks?.github && (
          <a
            href={portfolio.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="mela-action"
          >
            <BsGithub />
            <span>GitHub</span>
          </a>
        )}
        {portfolio.socialLinks?.linkedin && (
          <a
            href={portfolio.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mela-action"
          >
            <FaLinkedinIn />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </footer>
  );
}

export default MelaFooter;
