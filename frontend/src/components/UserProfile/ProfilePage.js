import React, { useState, useEffect } from "react";
import ProfileContent from "./ProfileContent";
import ProfileCard from "./ProfileCard";
import { Row, Col, Container } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import ProfileAPI from "./ProfileAPI";
import { useCookies } from "react-cookie";
export default function ProfilePage({ match }) {
  const [cookies, setcookies] = useCookies(['mytoken', 'user_id'])
  const [isOpen, setIsOpen] = useState(false);
  const [Profile, setProfile] = useState({ name: "" })
  const [isOwn, setisOwn] = useState(false)
  const [isCustomer, setisCustomer] = useState(false)
  let path = match.params["profile_id"]


  const toggleSideBar = () => {
    // console.log("kb");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    ProfileAPI.fakeisOwned(path, cookies["user_id"]).then(res => {
      if (res.status === "200") {
        setisOwn(true)
      } else if (res.status === "401") {
        setisOwn(false)
      }
      ProfileAPI.fakeCustomerProfile(path).then(res => {
        setProfile(res)
        setisCustomer(true)
        // console.log(res)
      }).catch(error => {
        console.error(error)
        ProfileAPI.fakeHostProfile(path).then(res => {
          setProfile(res)
          setisCustomer(false)
        }).catch(error => {
          console.error(error)
        })
      })

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
          <ProfileCard pageCollapse={pageCollapse} Profile={Profile} />
          <ProfileContent setpageCollapse={setpageCollapse} Profile={Profile} isOwn={isOwn} />
        </Container>
      </div>
    </div>
  );
}
