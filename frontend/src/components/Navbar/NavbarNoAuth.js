import React, { useState } from "react";
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
  Button,
  ButtonGroup,
} from "reactstrap";
import LoginModal from "../LoginForm/LoginModal";
import { Link } from "react-router-dom";

const NavbarNoAuth = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const MouseOver = (e) => {
    e.target.style.background = '#f9e07f';
    e.target.style.color = '#264d59';
  }

  const MouseLeave = (e) => {
    e.target.style.background = '#264d59';
    e.target.style.color = '#f9e07f';
  }


  return (
    <div>
      <Navbar style={{ backgroundColor: "#f9e07f", position: "fixed", width: "100%", zIndex: "20" ,height:"70px"}} light expand="md">
        <Link to="/">
          <NavbarBrand>
            <h3 style={{ color: "#264d59", margin: "5%" }}>HOSTDOG</h3>
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/components/" style={{ color: "#264d59" }}>Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap" style={{ color: "#264d59" }}>
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: "#264d59" }}>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <a href="/signup" onClick={props.clear} style={{ marginRight: "10px", border: "0px", color: "#264d59", backgroundColor: "#f9e07f", fontSize: "20px" }}>
            Sign Up{" "}
          </a>
          <LoginModal buttonLabel="Log In" MouseOver={MouseOver} MouseLeave={MouseLeave}/>{" "}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarNoAuth;
