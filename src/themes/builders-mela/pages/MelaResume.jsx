import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import portfolio from "../../../Portfolio";
import localResume from "../../../Assets/CPRCV (3).pdf";
import MelaSection from "../components/MelaSection";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function MelaResume() {
  const [width, setWidth] = useState(980);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { previewSource, downloadLink } = useMemo(() => {
    const remoteLink = portfolio.resumeLink;
    const hasRemotePdf =
      typeof remoteLink === "string" && remoteLink.toLowerCase().endsWith(".pdf");

    return {
      previewSource: hasRemotePdf ? remoteLink : localResume,
      downloadLink: localResume,
    };
  }, []);

  const pdfScale = width > 1100 ? 1.35 : width > 760 ? 1.05 : 0.58;

  return (
    <div className="mela-page">
      <MelaSection
        eyebrow="Resume"
        title="A Formal Snapshot Of The Builder"
        className="mela-page-heading-section"
      >
        <div className="mela-resume-actions">
          <a
            href={downloadLink}
            target="_blank"
            rel="noreferrer"
            className="mela-action mela-action-primary"
          >
            <AiOutlineDownload />
            <span>Download Resume</span>
          </a>
          <a href={`mailto:${portfolio.email}`} className="mela-action">
            <span>{portfolio.email}</span>
          </a>
        </div>
      </MelaSection>

      <section className="mela-dossier-frame">
        <div className="mela-dossier-rail">
          <span>Profile</span>
          <span>Experience</span>
          <span>Projects</span>
          <span>Systems</span>
        </div>
        <div className="mela-pdf-wrap">
          <Document file={previewSource} className="mela-pdf-document">
            <Page pageNumber={1} scale={pdfScale} />
          </Document>
        </div>
      </section>
    </div>
  );
}

export default MelaResume;
