import React, { useState,useEffect } from "react";
import ProfileContent from "./ProfileContent";
import ProfileCard from "./ProfileCard";
import { Row, Col, Container } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import ProfileAPI from "./ProfileAPI";

export default function ProfilePage({match}) {
  const [isOpen, setIsOpen] = useState(false);
  const [Profile, setProfile] = useState({name:""})
  const toggleSideBar = () => {
    console.log("kb");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getpath = match.params["profile_id"]
    
    ProfileAPI.fakeProfile(getpath).then(res=>{
      setProfile(res.data)
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
          <ProfileCard pageCollapse={pageCollapse} Profile={Profile}/>
          <ProfileContent setpageCollapse={setpageCollapse} Profile={Profile}/>
        </Container>
      </div>
    </div>
  );
}
