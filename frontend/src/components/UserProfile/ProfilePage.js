import React, { useState } from "react";
import ProfileContent from "./ProfileContent";
import ProfileCard from "./ProfileCard";
import { Row, Col, Container } from "reactstrap";
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
      <header style={{ position: "fixed", width: "100%", zIndex: "1001" }}>
        <NavbarIsAuth toggleSideBar={toggleSideBar} />
      </header>
      <SideBar isOpen={isOpen} />
      <div style={{ paddingTop: "50px" }}>
        <Container>
          <ProfileCard />
          <ProfileContent />
        </Container>
      </div>
    </div>
  );
}