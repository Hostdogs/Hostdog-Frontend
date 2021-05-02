import React from "react";
import { Row, Col, Container } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import ServiceForm from "./ServiceForm";
import ServiceHost from "./ServiceHost";
import ServiceDetail from "./ServiceDetail";
export default function ServicePage() {
  return (
    <div>
      <NavbarIsAuth />
      <br />
      <br />
      <br />
      {/* <ServiceForm /> */}
      <div className="content">
        <Row>
          <Col xs="12" sm="12" md="12" lg="3">
            <ServiceHost />
          </Col>
          <Col xs="12" sm="12" md="12" lg="9">
            <ServiceForm mytoken={"ac5ff12742a6890c67a44a844e203d6ed5eee68f"} host_id={3} customer_id={1} />
            <br />
          </Col>
        </Row>
      </div>
    </div>
  );
}
