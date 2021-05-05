import React, { useState, useEffect } from "react";
import ProfileContent from "./ProfileContent";
import ProfileCard from "./ProfileCard";
import { Row, Col, Container } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
// import ProfileAPI from "./ProfileAPI";
import { useCookies } from "react-cookie";
import NotFound from "../Handle/NotFound";
import {useHistory } from "react-router-dom";
import HostAPI from "../API/HostAPI";
import CustomerAPI from "../API/CustomerAPI";
import AuthenAPI from "../API/AuthenAPI";
export default function ProfilePage({ match }) {
  let history = useHistory();
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  const [isOpen, setIsOpen] = useState(false);
  // const [Profile, setProfile] = useState();
  // const [dateJoin, setdateJoin] = useState()
  const [isOwned, setisOwned] = useState(false);
  // const [isHost, setisHost] = useState(false);
  const [Account, setAccount] = useState();
  const [userIsHost, setuserIsHost] = useState(true)
  let path = match.params["profile_id"];

  const toggleSideBar = () => {
    // console.log("kb");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!cookies["mytoken"]) {
      history.push("/");
      history.go(0);
    } else {
      if (path === cookies["user_id"]) {
        setisOwned(true);
      } else {
        setisOwned(false);
      }
      AuthenAPI.getUserAllInfo(cookies["mytoken"], path).then((res) => {
        console.log(res);
        // setisHost(res.data.is_host)
        // if(res.data.is_host){
        //   setProfile(res.data.host)
        // }else{
        //   setProfile(res.data.customer)
        // }

        setAccount(res.data);

        
      });
      AuthenAPI.getUserAllInfo(cookies["mytoken"], cookies["user_id"]).then(res=>{
        console.log(res.data)
        setuserIsHost(res.data.is_host)
      })
    }
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
            // Profile={Profile}
            // isHost={isHost}
            // dateJoin={dateJoin}
            Account={Account}
            isOwned={isOwned}
            userIsHost={userIsHost}
          />
          <ProfileContent
            setpageCollapse={setpageCollapse}
            // Profile={Profile}
            isOwned={isOwned}
            // isHost={isHost}
            profileId={path}
            Account={Account}
            setAccount={setAccount}
          />
        </Container>
      </div>
    </div>
  );
}
