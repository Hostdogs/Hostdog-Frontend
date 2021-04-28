import React, { useState, useEffect } from "react";
import ProfileContent from "./ProfileContent";
import ProfileCard from "./ProfileCard";
import { Row, Col, Container } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import ProfileAPI from "./ProfileAPI";
import { useCookies } from "react-cookie";
import NotFound from "../Handle/NotFound";
import { useHistory } from "react-router";

export default function ProfilePage({ match }) {
  let history = useHistory();
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  const [isOpen, setIsOpen] = useState(false);
  const [Profile, setProfile] = useState({ name: "" });
  const [isOwned, setisOwned] = useState(false);
  const [isCustomer, setisCustomer] = useState(false);
  let path = match.params["profile_id"];

  const toggleSideBar = () => {
    // console.log("kb");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    ProfileAPI.fakeisOwned(path, cookies["user_id"]).then((res) => {
      if (res.status === "200") {
        setisOwned(true);
      } else if (res.status === "401") {
        setisOwned(false);
      }
      ProfileAPI.fakeCustomerProfile(path)
        .then((res) => {
          setProfile(res);
          setisCustomer(true);
          // console.log(res)
        })
        .catch((error) => {
          console.error(error);
          ProfileAPI.fakeHostProfile(path)
            .then((res) => {
              setProfile(res);
              setisCustomer(false);
            })
            .catch((error) => {
              console.error(error);
              history.push("/404");
            });
        });
    });
  }, []);

  const [pageCollapse, setpageCollapse] = useState(true);
  return (
    <div>
      <header style={{ position: "fixed", width: "100%", zIndex: "1001" }}>
        <NavbarIsAuth toggleSideBar={toggleSideBar} />
      </header>

      <SideBar isOpen={isOpen} />
      <div style={{ paddingTop: "50px" }}>
        <Container fluid="md">
          <ProfileCard
            pageCollapse={pageCollapse}
            Profile={Profile}
            isCustomer={isCustomer}
          />
          <ProfileContent
            setpageCollapse={setpageCollapse}
            Profile={Profile}
            isOwned={isOwned}
            isCustomer={isCustomer}
            profileId={path}
          />
        </Container>
      </div>
    </div>
  );
}
