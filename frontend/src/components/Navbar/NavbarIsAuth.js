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
        className="Navbar-sticky"
        style={{ backgroundColor: "#ffe080" }}
        dark
      >
        <NavbarToggler onClick={toggleSideBar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">
          HOSTDOG
        </NavbarBrand>
      </Navbar>
    </div>
  );
}
