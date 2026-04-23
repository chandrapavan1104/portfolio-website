import React from "react";

function SkillDistrict({ title, items, tone = "gold" }) {
  if (!items?.length) {
    return null;
  }

  return (
    <article className={`mela-skill-district mela-skill-${tone}`}>
      <div className="mela-district-sign">
        <span>{String(items.length).padStart(2, "0")}</span>
        <h3>{title}</h3>
      </div>
      <div className="mela-token-grid">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

export default SkillDistrict;
