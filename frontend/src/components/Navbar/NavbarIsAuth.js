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

const NavbarIsAuth = ({toggle}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);
  
  return (
    <div>
      <Navbar style={{backgroundColor:"#ffe080"}} light>
        <NavbarToggler onClick={toggle} className="mr-2"/>
        <NavbarBrand href="/" className="mr-auto">HOSTDOG</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default NavbarIsAuth;