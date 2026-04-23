import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import { BrowserRouter as Router } from "react-router-dom";
import { getPortfolioTheme } from "./themes/themeRegistry";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./themes/builders-mela/builders-mela.css";

function AppLayout({ load }) {
  const activeTheme = getPortfolioTheme();
  const ThemeApp = activeTheme.component;

  return (
    <>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <ThemeApp />
      </div>
    </>
  );
}

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AppLayout load={load} />
    </Router>
  );
}

export default App;
