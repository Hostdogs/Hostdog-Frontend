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
import HostServiceTab from "./Tab/Manage/HostServiceTab";
import ServiceDetailTab from "./Tab/ServiceDetail/ServiceDetailTab";

const ProfileContent = ({
  setpageCollapse,
  Profile,
  isOwned,
  isCustomer,
  profileId,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab === "1") {
      setpageCollapse(true);
    } else {
      setpageCollapse(false);
    }
  }, [activeTab]);

  return (
    <div>
      <Nav tabs style={{cursor:"pointer"}}>
        <NavItem style={{borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
            style={{color:"#264d59"}}
          >
            หน้าหลัก
          </NavLink>
        </NavItem>
        <NavItem style={{borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
            style={{color:"#264d59"}}
          >
            สุนัข
          </NavLink>
        </NavItem>
        <NavItem style={{borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
            style={{color:"#264d59"}}
          >
            จัดการการบริการ
          </NavLink>
        </NavItem>
        <NavItem style={{borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
            style={{color:"#264d59"}}
          >
            รายละเอียดบริการ
          </NavLink>
        </NavItem>
        <NavItem style={{borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
            style={{color:"#264d59"}}
          >
            ตั้งค่า
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <MainTab
            isOwned={isOwned}
            isCustomer={isCustomer}
            Profile={Profile}
          />
        </TabPane>

        <TabPane tabId="2">
          <DogProfileTab profileId={profileId} />
        </TabPane>

        <TabPane tabId="3">
          <HostServiceTab />
        </TabPane>
        <TabPane tabId="4">
          <ServiceDetailTab />
        </TabPane>
        <TabPane tabId="5">
          <SettingTab />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProfileContent;
