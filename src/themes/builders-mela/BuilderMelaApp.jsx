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
import MelaBuilding from "./pages/MelaBuilding";
import MelaFeedback from "./pages/MelaFeedback";
import useVisitTracker from "../../lib/useVisitTracker";

// The visits dashboard is a local tool, not a page on the site. `import.meta.
// env.DEV` is a build-time constant, so this whole branch — and the dashboard
// chunk behind it — is dropped from the production bundle. In a deployed build
// /admin is not a route at all and falls through to the catch-all redirect.
// Reach it with `npm run dev` at http://localhost:5173/admin.
const MelaAdmin = import.meta.env.DEV
  ? React.lazy(() => import("./pages/MelaAdmin"))
  : null;

function BuilderMelaApp() {
  const location = useLocation();
  const isGuide = location.pathname === "/chatbot";

  useVisitTracker();
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
          <Route path="/building" element={<MelaBuilding />} />
          <Route path="/feedback/:slug" element={<MelaFeedback />} />
          <Route path="/feedback" element={<Navigate to="/building" replace />} />
          {MelaAdmin && (
            <Route
              path="/admin"
              element={
                <React.Suspense fallback={null}>
                  <MelaAdmin />
                </React.Suspense>
              }
            />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isGuide && <MelaFooter />}
    </div>
  );
}

export default BuilderMelaApp;
