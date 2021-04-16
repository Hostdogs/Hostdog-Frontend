import React from "react";
import { Row, Col, container } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import ServiceForm from "./ServiceForm";
export default function ServicePage() {
  return (
    <div>
      <container>
        <NavbarIsAuth />
        <br />
        <br />
        <br />
        <Row>
          <Col xs="3" style={{ border: "4px solid black" }}>
            สวัสดี
          </Col>
          <Col xs="6">
            <ServiceForm />
          </Col>
          <Col xs="3" style={{ border: "4px solid black" }}>
            .col-3
          </Col>
        </Row>
      </container>
    </div>
  );
}
