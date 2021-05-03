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
import DogProfileTab from "./Tab/Dog/DogProfileTab";
import MainTab from "./Tab/MainTab";
import SettingTab from "./Tab/SettingTab";
import HostServiceTab from "./Tab/Manage/HostServiceTab";
import ServiceDetailTab from "./Tab/ServiceDetail/ServiceDetailTab";

const ProfileContent = ({
  setpageCollapse,
  Account,
  isOwned,
  setAccount,
  profileId,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [isHost, setisHost] = useState()
  // const [Profile, setProfile] = useState()
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (Account) {
      setisHost(Account.is_host)
    }

  }, [Account])

  useEffect(() => {
    if (activeTab === "1") {
      setpageCollapse(true);
    } else {
      setpageCollapse(false);
    }
  }, [activeTab]);

  return (
    <div>
      <Nav tabs style={{ cursor: "pointer" }}>
        <NavItem
          style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        >
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
            style={{ color: "#264d59" }}
          >
            หน้าหลัก
          </NavLink>
        </NavItem>
        {!isHost ? (
          <NavItem
            style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
          >
            {!isHost ? (<NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
              style={{ color: "#264d59" }}
            >
              สุนัข
            </NavLink>) : (null)}
          </NavItem>
        ) : (null)}

        {isHost && !isOwned? (
          <NavItem
            style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
          >
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}
              style={{ color: "#264d59" }}
            >
              รายละเอียดบริการ
          </NavLink>
          </NavItem>
        ) : (
          null
        )}


        {isHost && isOwned ? (
          <NavItem
            style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
          >
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
              style={{ color: "#264d59" }}
            >
              จัดการการบริการ
          </NavLink>
          </NavItem>) : (null)}



        {isOwned ? (
          <NavItem
            style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
          >
            <NavLink
              className={classnames({ active: activeTab === "5" })}
              onClick={() => {
                toggle("5");
              }}
              style={{ color: "#264d59" }}
            >
              ตั้งค่า
          </NavLink>
          </NavItem>
        ) : (null)}

      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <MainTab
            isOwned={isOwned}
            isHost={isHost}
            Account={Account}
          />
        </TabPane>
        {!isHost ? (
          <TabPane tabId="2">
            <DogProfileTab profileId={profileId} />
          </TabPane>
        ) : (
          null
        )}

        {isHost && !isOwned ? (
          <TabPane tabId="4">
            <ServiceDetailTab profileId={profileId} />
          </TabPane>
        ) : (null)}


        {isHost && isOwned ? (
          <TabPane tabId="3">
            <HostServiceTab profileId={profileId} />
          </TabPane>
        ) : (null)}

        {isOwned ? (
          <TabPane tabId="5">
            <SettingTab Account={Account} setAccount={setAccount} />
          </TabPane>
        ) : (null)}

      </TabContent>
    </div >
  );
};

export default ProfileContent;
