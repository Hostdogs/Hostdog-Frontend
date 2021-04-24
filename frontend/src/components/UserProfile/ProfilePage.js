import React, { useState,useEffect } from "react";
import ProfileContent from "./ProfileContent";
import ProfileCard from "./ProfileCard";
import { Row, Col, Container } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import ProfileAPI from "./ProfileAPI";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => {
    console.log("kb");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let path =  window.location.pathname
    console.log(path)
    ProfileAPI.fakeProfile(1).then(res=>{
      console.log(res.data)
    })
  }, [])

  const [pageCollapse, setpageCollapse] = useState(true)
  return (
    <div>
      <header style={{ position: "fixed", width: "100%", zIndex: "1001" }}>
        <NavbarIsAuth toggleSideBar={toggleSideBar} />
      </header>
      
      <SideBar isOpen={isOpen} />
      <div style={{ paddingTop: "50px" }}>
        <Container fluid="md">
          <ProfileCard pageCollapse={pageCollapse}/>
          <ProfileContent setpageCollapse={setpageCollapse}/>
        </Container>
      </div>
    </div>
  );
}
