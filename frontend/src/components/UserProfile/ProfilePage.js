import React, { useState } from "react";
import ProfileContent from "./ProfileContent";
import ProfileCard from "./ProfileCard";
import { Row, Col } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => {
    console.log("kb");
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header style={{ position: "fixed",width:"100%", zIndex:"1001"}}>
        <NavbarIsAuth toggleSideBar={toggleSideBar} />
      </header>
      <SideBar isOpen={isOpen} />
      <div style={{paddingTop:"50px"}}>
      <Row>
        <Col
          style={{
            paddingLeft: "0",
            paddingRight: "0",
          }}
        ></Col>
        <Col
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            width: "80vw",
          }}
        >
          <ProfileCard />
          <ProfileContent />
        </Col>
        <Col
          style={{
            paddingLeft: "0",
            paddingRight: "0",
          }}
        ></Col>
      </Row>
      </div>
    </div>
  );
}
