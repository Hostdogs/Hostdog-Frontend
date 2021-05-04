import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import ServiceForm from "./ServiceForm";
import ServiceHost from "./ServiceHost";
import ServiceDetail from "./ServiceDetail";
import HostAPI from "../API/HostAPI";
import { useCookies } from "react-cookie";
import HostServiceAPI from "../API/HostServiceAPI";
import SideBar from "../sidebar/SideBar";
import AuthenAPI from "../API/AuthenAPI";
export default function ServicePage({ match }) {
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  const [isOpen, setIsOpen] = useState(false);
  const [hostpath, sethostpath] = useState()
  let path = match.params["host_id"];
  const [host, sethost] = useState()
  const [hostService, sethostService] = useState()
  const [customerAccount, setcustomerAccount] = useState()
  const toggleSideBar = () => {
    setIsOpen(!isOpen)
  }
 
  useEffect(() => {

    HostAPI.getHostDetails(cookies["mytoken"],path).then(res=>{
      sethost(res.data)
      console.log(res.data)
    })
    HostServiceAPI.getHostService(cookies["mytoken"],path).then(res=>{
      sethostService(res.data)
      console.log("service",res.data)
    })
    
    AuthenAPI.getUserAllInfo(cookies["mytoken"],cookies["user_id"]).then(res=>{
      setcustomerAccount(res.data)
      console.log("hello",res.data)
    })
  }, [])

  return (
    <div>
      <NavbarIsAuth toggleSideBar={toggleSideBar} />
      <SideBar isOpen={isOpen} />
      {/* <ServiceForm /> */}
      <div className="content" style={{ paddingTop: "70px" }}>
        <Row>
          <Col xs="12" sm="12" md="12" lg="3" style={{ paddingTop: "10px" }}>
            <ServiceHost host={host} customerAccount={customerAccount}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="9">
            <ServiceForm host={host} customerAccount={customerAccount} hostService={hostService}/>
            <br />
          </Col>
        </Row>
      </div>
    </div>
  );
}
