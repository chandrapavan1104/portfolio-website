import React from "react";
import MelaSection from "../components/MelaSection";
import SkillDistrict from "../components/SkillDistrict";
import { skillDistricts } from "../melaData";
import portfolio from "../../../Portfolio";

function MelaAbout() {
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
            <span>Full-stack engineering</span>
            <span>GenAI product workflows</span>
            <span>Cloud-native deployment</span>
          </div>
        </div>
      </MelaSection>

      <section className="mela-skill-grid">
        {skillDistricts.map((district) => (
          <SkillDistrict
            title={district.title}
            items={portfolio.skills?.[district.key] || []}
            tone={district.tone}
            key={district.key}
          />
        ))}
      </section>

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
