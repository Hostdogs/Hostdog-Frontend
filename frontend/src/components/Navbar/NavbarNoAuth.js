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
import './NavbarNoAuth.css'

const NavbarNoAuth = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const MouseOver = (e) => {
    e.target.style.background = "#f9e07f";
    e.target.style.color = "#264d59";
  };

  const MouseLeave = (e) => {
    e.target.style.background = "#264d59";
    e.target.style.color = "#f9e07f";
  };

  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "#f9e07f",
          position: "fixed",
          width: "100%",
          zIndex: "20",
          height: "70px",
        }}
        light
        expand="md"
      >
        <Link to="/">
          <NavbarBrand>
            <h3 className="navbar_brand_hostdog" style={{ color: "#264d59", margin: "5%" }}>HOSTDOG</h3>
          </NavbarBrand>
        </Link>
          <Nav className="mr-auto" style={{ backgroundColor: "#f9e07f" }}></Nav>
          <br/>
          <a
            href="/signup"
            className="SignUpSize"
            onClick={props.clear}
            style={{
              marginRight: "10px",
              border: "0px",
              color: "#264d59"
            }}
          >
            Sign Up{" "}
          </a>
          <LoginModal
            buttonLabel="Log In"
            MouseOver={MouseOver}
            MouseLeave={MouseLeave}
          />{" "}
      </Navbar>
    </div>
  );
};

export default NavbarNoAuth;
