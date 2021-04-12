import React, { useState } from "react";
import ProfileContent from "./ProfileContent";
import ProfileCard from "./ProfileCard";
import { Row, Col } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import './ProfilePage.css'

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => {
    console.log("kb");
    setIsOpen(!isOpen);
  };

  return (
    <div className="hideScrollbar">
      <NavbarIsAuth toggleSideBar={toggleSideBar} />
      <SideBar isOpen={isOpen} />
      <Row>
        <Col
          style={{
            minWidth: "300px",
            paddingTop: "0",
            paddingBottom: "0",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        ></Col>
        <Col
          style={{
            minWidth: "50%",
            paddingTop: "0",
            paddingBottom: "0",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          <ProfileContent />
        </Col>
        <Col
          style={{
            minWidth: "300px",
            paddingTop: "0",
            paddingBottom: "0",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          <ProfileCard />
        </Col>
      </Row>
    </div>
  );
}
