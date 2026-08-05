import React from "react";
import MelaSection from "../components/MelaSection";
import SkillDistrict from "../components/SkillDistrict";
import { skillDistricts } from "../melaData";
import portfolio from "../../../Portfolio";

function MelaAbout() {
  // Number only the districts that actually render, so the sequence never
  // skips a value when a skill list is empty.
  let counter = 0;
  const numberedDistricts = skillDistricts.map((district) => {
    const hasItems = (portfolio.skills?.[district.key] || []).length > 0;
    return { ...district, number: hasItems ? (counter += 1) : null };
  });

  return (
    <div className="mela-page">
      <MelaSection
        eyebrow="Skill Map"
        title="Systems, Interfaces, Agents, And The Glue Between Them"
        className="mela-page-heading-section"
      >
        <div className="mela-about-intro">
          <p>{portfolio.about}</p>
          <div className="mela-about-facts">
            <span>Agent architecture</span>
            <span>Local &amp; multi-model inference</span>
            <span>Full-stack delivery</span>
          </div>
        </div>
      </MelaSection>

      <MelaSection
        eyebrow="AI Systems"
        title="How I Build With Models, Not Just Around Them"
      >
        <div className="mela-skill-grid">
          {numberedDistricts
            .filter((district) => district.group === "ai")
            .map((district) => (
              <SkillDistrict
                title={district.title}
                items={portfolio.skills?.[district.key] || []}
                tone={district.tone}
                number={district.number}
                key={district.key}
              />
            ))}
        </div>
      </MelaSection>

      <MelaSection eyebrow="Foundations" title="The Stack Underneath All Of It">
        <div className="mela-skill-grid">
          {numberedDistricts
            .filter((district) => district.group === "foundation")
            .map((district) => (
              <SkillDistrict
                title={district.title}
                items={portfolio.skills?.[district.key] || []}
                tone={district.tone}
                number={district.number}
                key={district.key}
              />
            ))}
        </div>
      </MelaSection>

      <MelaSection eyebrow="Experience Timeline" title="Where The Work Has Shipped">
        <div className="mela-timeline">
          {(portfolio.experience || []).map((role, index) => (
            <article className="mela-checkpoint" key={`${role.company}-${role.title}`}>
              <div className="mela-checkpoint-pin">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p>{role.duration}</p>
                <h3>{role.title}</h3>
                <strong>{role.company}</strong>
                <ul>
                  {role.details?.slice(0, 3).map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </MelaSection>

      <MelaSection eyebrow="Education" title="Formal Training">
        <div className="mela-education-grid">
          {(portfolio.education || []).map((item) => (
            <article className="mela-education" key={item.degree}>
              <span>{item.duration}</span>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
            </article>
          ))}
        </div>
      </MelaSection>
    </div>
  );
}

export default MelaAbout;
