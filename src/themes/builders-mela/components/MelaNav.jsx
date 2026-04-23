import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineFileText,
  AiOutlineHome,
  AiOutlineRobot,
  AiOutlineTool,
} from "react-icons/ai";
import { BsGithub, BsGrid3X3Gap, BsMoonStars, BsSun } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import portfolio from "../../../Portfolio";

const navItems = [
  { to: "/", label: "Home", icon: <AiOutlineHome /> },
  { to: "/about", label: "Skills", icon: <AiOutlineTool /> },
  { to: "/project", label: "Projects", icon: <BsGrid3X3Gap /> },
  { to: "/resume", label: "Resume", icon: <AiOutlineFileText /> },
  { to: "/chatbot", label: "AI Guide", icon: <AiOutlineRobot /> },
];

function MelaNav({ appearance = "dark", onToggleAppearance }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = portfolio.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3);

  return (
    <header className={`mela-nav ${scrolled ? "mela-nav-scrolled" : ""}`}>
      <NavLink to="/" className="mela-brand" aria-label="Build Grounds home">
        <span className="mela-brand-mark">{initials}</span>
        <span className="mela-brand-text">
          <span>Build</span>
          <strong>Grounds</strong>
        </span>
      </NavLink>

      <nav className="mela-route-dock" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `mela-route ${isActive ? "mela-route-active" : ""}`
            }
            key={item.to}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mela-socials" aria-label="Social links">
        <button
          type="button"
          className="mela-theme-toggle"
          onClick={onToggleAppearance}
          aria-label={`Switch to ${appearance === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${appearance === "dark" ? "light" : "dark"} theme`}
        >
          {appearance === "dark" ? <BsSun /> : <BsMoonStars />}
        </button>
        {portfolio.socialLinks?.github && (
          <a
            href={portfolio.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <BsGithub />
          </a>
        )}
        {portfolio.socialLinks?.linkedin && (
          <a
            href={portfolio.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        )}
      </div>
    </header>
  );
}

export default MelaNav;
