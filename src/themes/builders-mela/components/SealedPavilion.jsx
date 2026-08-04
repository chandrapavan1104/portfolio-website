import React from "react";
import { BsLock } from "react-icons/bs";

function SealedPavilion({ project, index }) {
  return (
    <article
      className="mela-pavilion mela-pavilion-sealed"
      style={{ "--stall-index": index }}
      aria-label="Unreleased project — details under wraps"
    >
      <div className="mela-pavilion-topline">
        <span className="mela-stall-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mela-district">{project.district}</span>
      </div>

      <h3 className="mela-sealed-title" aria-hidden="true">
        <span />
        <span />
        <span />
      </h3>

      <p className="mela-sealed-teaser">{project.teaser}</p>

      <div className="mela-sealed-tag">
        <BsLock />
        <span>Under wraps · reveal soon</span>
      </div>
    </article>
  );
}

export default SealedPavilion;
