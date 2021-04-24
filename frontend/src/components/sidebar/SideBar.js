import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHistory,
  faCog,
  faSignOutAlt,
  faFlag,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link,useHistory } from "react-router-dom";
import "./SideBar.css"
import {useCookies} from 'react-cookie'


export default function SideBar({isOpen}) {
  let history = useHistory()
  const [token,setToken,removeToken] = useCookies(['mytoken'])
  const [userId, setuserId,removeuserId] = useCookies(['user_id'])
  const logOut = (e) =>{
    console.log("logging out")
    removeToken('mytoken')
    removeuserId('user_id')
    history.push("/")
    history.go(0)
  }
  return (
  
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem style={{ marginTop: "10%" }}>
            <NavLink tag={Link} to={"/"} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
            ค้นหาผู้รับฝาก
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/profile"} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
            โปรไฟล์
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/ประวัติการใช้บริการ"} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
            ประวัติการใช้บริการ
          </NavLink>
          </NavItem >
          <div>
            <br />
            <hr style={{ borderWidth: "1px", marginLeft: "5%" }} />
          </div>
          <NavItem style={{ marginTop: "10%" }}>
            <NavLink tag={Link} to={"/การรายงาน"} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faFlag} className="mr-2" />
            การรายงาน
          </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink tag={Link} to={"/การตั้งค่า"} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faCog} className="mr-2" />
            การตั่งค่า
          </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink tag={Link} onClick={logOut} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            ออกจากระบบ
          </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  )
}

