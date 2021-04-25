import React, { useState } from 'react';
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



export default function NavbarIsAuth({toggleSideBar}) {
  

  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#f9e07f", position: "fixed", width:"100%", zIndex:"3" ,height:"70px"}}
        light
      >
        <NavbarToggler onClick={toggleSideBar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">
        <h3 style={{color:"#264d59", margin:"5%"}}>HOSTDOG</h3>
        </NavbarBrand>
      </Navbar>
    </div>
  );
}
