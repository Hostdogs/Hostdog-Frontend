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

      {/* <ServiceForm /> */}
      <div className="content" style={{paddingTop:"70px"}}>
        <Row>
          <Col xs="12" sm="12" md="12" lg="3">
            <ServiceHost />
          </Col>
          <Col xs="12" sm="12" md="12" lg="9">
            <ServiceForm />
            <br />
          </Col>
        </Row>
      </div>
    </div>
  );
}
