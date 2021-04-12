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
      <div style={{zIndex:"5"}}>
        <NavbarIsAuth toggleSideBar={toggleSideBar} />
      </div>
      <div>
        <Row>
        <Col
          style={{
            minWidth: "25%",
            paddingTop: "0",
            paddingBottom: "0",
            paddingLeft: "0",
            paddingRight: "0",
            backgroundColor: "tomato",
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
            minWidth: "25%",
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
    </div>
  );
}
