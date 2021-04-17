import React from "react";
import { Container, UncontrolledCarousel, Row, Col } from "reactstrap";

export default function ServiceHost() {
  const items = [
    {
      src: "logo192.png",
      key: "1",
    },
    {
      src: "logo192.png",

      key: "2",
    },
    {
      src: "logo192.png",
      key: "3",
    },
  ];

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <UncontrolledCarousel items={items} />;
          </Col>
        </Row>
        <Row style={{ height: "200px" }}>Google Map</Row>
        <Row>ที่อยู่</Row>
      </Container>
    </div>
  );
}
