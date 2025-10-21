import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import portfolio from "../../Portfolio";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import localResume from "../../Assets/Chandra.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const resumeLink = portfolio.resumeLink || localResume;
  const canPreviewPdf = typeof resumeLink === "string" && resumeLink.toLowerCase().endsWith(".pdf");

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={resumeLink || "#"}
            target="_blank"
            rel="noreferrer"
            style={{ maxWidth: "250px" }}
            disabled={!resumeLink}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        {canPreviewPdf ? (
          <Row className="resume">
            <Document file={resumeLink} className="d-flex justify-content-center">
              <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
            </Document>
          </Row>
        ) : (
          <Row className="resume">
            <p style={{ color: "white", textAlign: "center" }}>
              {resumeLink
                ? "The resume opens in a new tab."
                : "Resume link coming soon."}
            </p>
          </Row>
        )}

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={resumeLink || "#"}
            target="_blank"
            rel="noreferrer"
            style={{ maxWidth: "250px" }}
            disabled={!resumeLink}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
