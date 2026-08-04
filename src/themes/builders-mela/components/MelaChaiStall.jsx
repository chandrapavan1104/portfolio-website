import React from "react";
import { BsCupHotFill } from "react-icons/bs";
import portfolio from "../../../Portfolio";
import MelaSection from "./MelaSection";

function MelaChaiStall() {
  const supportLink = portfolio.supportLink;

  if (!supportLink) {
    return null;
  }

  return (
    <MelaSection
      eyebrow="Chai Stall"
      title="If a build here helped, buy me a cup"
      className="mela-chai-section"
    >
      <div className="mela-chai">
        <div className="mela-chai-visual" aria-hidden="true">
          <span className="mela-chai-steam" />
          <span className="mela-chai-steam" />
          <span className="mela-chai-steam" />
          <BsCupHotFill className="mela-chai-cup" />
        </div>

        <div className="mela-chai-copy">
          <p>
            Everything on these grounds is built after hours, on my own machine
            and my own dime — no ads, no paywalls, nothing tracking you. If a
            project here saved you time or sparked an idea, you can drop a cup of
            chai in the jar. Entirely optional; the work stays free either way.
          </p>
          <a
            href={supportLink}
            target="_blank"
            rel="noreferrer"
            className="mela-action mela-action-primary mela-chai-button"
          >
            <BsCupHotFill />
            <span>Buy me a cup</span>
          </a>
        </div>
      </div>
    </MelaSection>
  );
}

export default MelaChaiStall;
