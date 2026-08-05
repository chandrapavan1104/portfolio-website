import React from "react";

// `number` is the district's position on the skill map, matching the ordinal
// pins used by the experience timeline and project stalls. It is deliberately
// not items.length — a zero-padded count reads as an index and misleads.
function SkillDistrict({ title, items, tone = "gold", number }) {
  if (!items?.length) {
    return null;
  }

  return (
    <article className={`mela-skill-district mela-skill-${tone}`}>
      <div className="mela-district-sign">
        {number != null && <span>{String(number).padStart(2, "0")}</span>}
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
