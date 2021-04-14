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
      <header >
        <NavbarIsAuth toggleSideBar={toggleSideBar} />
      </header>
        <SideBar isOpen={isOpen} marginTop="0px" />
      <Row>
        <Col
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            width: "33.33%",
          }}
        ></Col>
        <Col
          style={{
            minWidth: "500px",
            paddingLeft: "0",
            paddingRight: "0",
            width: "33.33%",
          }}
        >
          <ProfileCard />
          <ProfileContent />
        </Col>
        <Col
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            width: "33.33%",
          }}
        ></Col>
      </Row>
    </div>
  );
}
