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
        style={{ backgroundColor: "#f9e07f", position: "fixed", width:"100%", zIndex:"3" }}
        light
      >
        <NavbarToggler onClick={toggleSideBar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">
          HOSTDOG
        </NavbarBrand>
      </Navbar>
    </div>
  );
}
