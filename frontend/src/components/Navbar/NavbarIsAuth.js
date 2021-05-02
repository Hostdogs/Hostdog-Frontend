import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import AuthenAPI from '../API/AuthenAPI';



export default function NavbarIsAuth({ toggleSideBar }) {
  const [cookie, setcookie] = useCookies(["mytoken", "user_id"])
  const [Name, setName] = useState()
  const [img, setimg] = useState()
  const placeholderPath = "/user_placeholder.svg"
  const urllink = `/profile/${cookie["user_id"]}`
  useEffect(() => {
    AuthenAPI.getUserAllInfo(cookie["mytoken"], cookie["user_id"]).then(res => {
      console.log(res.data)
      if (res.data.is_host) {
        setName(res.data.host.first_name + " " + res.data.host.last_name)
      } else {
        setName(res.data.customer.first_name + " " + res.data.customer.last_name)
      }
    })
  }, [])
  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#f9e07f", position: "fixed", width: "100%", zIndex: "3", height: "70px" }}
        light
      >
        <NavbarToggler onClick={toggleSideBar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">
          <h3 style={{ color: "#264d59", margin: "5%" }}>HOSTDOG</h3>
        </NavbarBrand>
        <Nav className="mr-auto" >
        </Nav>
        <div>
          {Name} <a href={urllink} ><img
            src={img || placeholderPath}
            class="img-responsive center-block"
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              objectFit: "cover",
            }}

          /></a>
        </div>

      </Navbar>
    </div>
  );
}
