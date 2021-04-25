import React, { useState, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import DogProfileTab from "./Tab/DogProfileTab";
import MainTab from "./Tab/MainTab";
import SettingTab from "./Tab/SettingTab";

const ProfileContent = ({ setpageCollapse, Profile, isOwned, isCustomer }) => {
  const [activeTab, setActiveTab] = useState("1");


  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab === "1") {
      setpageCollapse(true)
    } else {
      setpageCollapse(false)
    }
  }, [activeTab])

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
            หน้าหลัก
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            สุนัข
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            จัดการการบริการ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            รายละเอียดบริการ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            ตั้งค่า
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <MainTab isOwned={isOwned} isCustomer={isCustomer} Profile={Profile}/>
        </TabPane>

        <TabPane tabId="2">
          <DogProfileTab />
        </TabPane>

        <TabPane tabId="3">
          {/* implement manage service later */}
        </TabPane>
        <TabPane tabId="4">
          {/* implement show service later */}
        </TabPane>
        <TabPane tabId="5">
          <SettingTab />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProfileContent;
