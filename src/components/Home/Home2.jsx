import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import portfolio from "../../Portfolio";

function Home2() {
  const coreStacksList = [
    ...(portfolio.skills?.languages || []),
    ...(portfolio.skills?.frontend || []),
    ...(portfolio.skills?.backend || []),
  ]
    .slice(0, 6);

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              {portfolio.about}
              {coreStacksList.length > 0 && (
                <>
                  <br />
                  <br />
                  <i>
                    <b className="purple">{coreStacksList.join(", ")}</b>
                  </i>
                </>
              )}
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
