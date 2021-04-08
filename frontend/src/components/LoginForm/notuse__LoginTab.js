import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import classnames from "classnames";

const LoginTab = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            User
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Host
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Username</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="username" />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Password</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="password" />
          </InputGroup>
          <br />
            <Button color="warning">LogIn</Button>
            <a style={{ marginLeft: "3%" }}>
              <a href="#">ลืมรหัสผ่าน</a>
            </a>
          <br />
          <br />
          <a>ยังไม่มีบัญชี?</a> <a href="#">สมัคร</a>
        </TabPane>
        <TabPane tabId="2">
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Username</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="username" />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Password</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="password" />
          </InputGroup>
          <br />
          <Button color="warning">LogIn</Button>
            <a style={{ marginLeft: "3%" }}>
              <a href="#">ลืมรหัสผ่าน</a>
            </a>
          <br />
          <br />
          <a>ยังไม่มีบัญชี?</a> <a href="#">สมัคร</a>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default LoginTab;
