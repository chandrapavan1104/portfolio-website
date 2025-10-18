import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import portfolio from "../../Portfolio";

function Home() {
  const socialLinks = portfolio.socialLinks || {};
  const SOCIAL_ICONS = {
    github: <AiFillGithub />,
    twitter: <AiOutlineTwitter />,
    instagram: <AiFillInstagram />,
    linkedin: <FaLinkedinIn />,
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name">{` ${portfolio.name}`}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
                {portfolio.subTitle && (
                  <p className="heading-description">{portfolio.subTitle}</p>
                )}
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />

      <Container>
        <Row style={{ paddingTop: "50px", paddingBottom: "80px" }}>
          <Col md={12} className="home-about-social">
            <h1>Find Me On</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              {Object.entries(socialLinks)
                .filter(([network, url]) => SOCIAL_ICONS[network] && url)
                .map(([network, url]) => (
                  <li className="social-icons" key={network}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour  home-social-icons"
                    >
                      {SOCIAL_ICONS[network]}
                    </a>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
