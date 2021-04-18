import React from "react";
import { Container, UncontrolledCarousel, Row, Col } from "reactstrap";

export default function ServiceHost() {
  const items = [
    {
      src: "host.jpg",
      key: "1",
    },
    {
      src: "host.jpg",
      key: "2",
    },
    {
      src: "host.jpg",
      key: "3",
    },
  ];

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <UncontrolledCarousel items={items} />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <img style={{ width: "100%" }} src="map.jpg" />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <h4>ที่อยู่</h4>
        </Row>
      </Container>
    </div>
  );
}
