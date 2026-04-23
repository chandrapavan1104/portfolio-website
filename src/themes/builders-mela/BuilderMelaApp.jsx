import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DoodleReel from "./components/DoodleReel";
import MelaNav from "./components/MelaNav";
import MelaFooter from "./components/MelaFooter";
import MelaHome from "./pages/MelaHome";
import MelaAbout from "./pages/MelaAbout";
import MelaProjects from "./pages/MelaProjects";
import MelaResume from "./pages/MelaResume";
import MelaGuide from "./pages/MelaGuide";

function BuilderMelaApp() {
  const location = useLocation();
  const isGuide = location.pathname === "/chatbot";
  const [appearance, setAppearance] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    return localStorage.getItem("buildGroundsAppearance") || "dark";
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("buildGroundsAppearance", appearance);
    document.body.dataset.melaAppearance = appearance;

    return () => {
      delete document.body.dataset.melaAppearance;
    };
  }, [appearance]);

  const toggleAppearance = () => {
    setAppearance((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`mela-theme ${isGuide ? "mela-guide-mode" : ""}`}
      data-appearance={appearance}
    >
      <DoodleReel />
      <MelaNav appearance={appearance} onToggleAppearance={toggleAppearance} />
      <main className="mela-main">
        <Routes>
          <Route path="/" element={<MelaHome />} />
          <Route path="/about" element={<MelaAbout />} />
          <Route path="/project" element={<MelaProjects />} />
          <Route path="/resume" element={<MelaResume />} />
          <Route path="/chatbot" element={<MelaGuide />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isGuide && <MelaFooter />}
    </div>
  );
}

export default BuilderMelaApp;
