import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="mela-theme">
      <MelaNav />
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
