import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
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

const NavbarIsAuth = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [isOpenSideBar, setSideBar] = useState(false);
  const toggleSideBar = () => setIsOpen(!isOpenSideBar);


  return (
    <div>
      <Navbar style={{backgroundColor:"#ffe080"}} light expand="md">
        <Button color="warning" onClick={toggleSideBar} style={{marginRight:"1%"}}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <NavbarBrand href="/">HOSTDOG</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <div>
            <NavbarText>Hello You are Loggedin</NavbarText>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarIsAuth;