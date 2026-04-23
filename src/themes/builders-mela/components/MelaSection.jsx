import React from "react";

function MelaSection({ eyebrow, title, children, className = "" }) {
  return (
    <section className={`mela-section ${className}`}>
      <div className="mela-section-heading">
        {eyebrow && <p className="mela-kicker">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default MelaSection;
