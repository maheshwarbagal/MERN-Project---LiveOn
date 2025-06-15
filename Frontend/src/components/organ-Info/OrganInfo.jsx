import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./OrganInfo.css";

const OrganInfo = () => {
  return (
    <div className="py-4 w-100 fullscreen-width">
      <Container fluid className="organ py-3 w-100">
        <h2 className="heading text-center mb-4 mt-5">
          ORGAN AND TISSUE DONATION
        </h2>
        <p className="para text-center mb-5">
          Organ donation is a process to implant of an organ from a living being
          or a cadaver to another living being to replace the lost function of
          one’s organs.
        </p>

        <Row className="gy-3 justify-content-between">
          <Col
            xs={12}
            md={3}
            style={{
              border: "0.2rem solid gray",
              borderRadius: "1em",
              margin: "1em",
            }}
            className="d-flex flex-column align-items-center text-center"
          >
            <Image
              className="heartIcon mb-3"
              src="/assets/hearticon.png"
              roundedCircle
              width={100}
              height={100}
            />
            <div className="Ticket">
              <h4>WHAT IS ORGAN AND TISSUE DONATION?</h4>
              <p>
                Organ donation means that a person during his lifetime pledges
                that after his/her death, organs from his/her body can…
              </p>
            </div>
          </Col>

          <Col
            xs={12}
            md={3}
            style={{
              border: "0.2rem solid gray",
              borderRadius: "1em",
              margin: "0.2em",
            }}
            className="d-flex flex-column align-items-center text-center"
          >
            <Image
              className="heartIcon mb-3"
              src="/assets/bodyOrgan.svg"
              roundedCircle
              width={100}
              height={100}
            />
            <div className="Ticket">
              <h4>WHAT IS TRANSPLANTATION?</h4>
              <p>
                Transplantation of human cells, tissues or organs saves many
                lives and restores essential functions where no alternatives…
              </p>
            </div>
          </Col>

          <Col
            xs={12}
            md={3}
            style={{
              border: "0.2rem solid gray",
              borderRadius: "1em",
              margin: "0.2em",
            }}
            className="d-flex flex-column align-items-center text-center"
          >
            <Image
              className="heartIcon mb-3"
              src="/assets/familyIcon.svg"
              roundedCircle
              width={100}
              height={100}
            />
            <div className="Ticket">
              <h4>WHO CAN DONATE?</h4>
              <p>
                Any person not less than 18 years of age, who voluntarily
                authorizes the removal of any of his organ and/or tissue…
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrganInfo;
