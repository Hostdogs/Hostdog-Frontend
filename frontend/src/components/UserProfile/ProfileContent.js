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
import Skeleton from "react-loading-skeleton";

const ProfileContent = ({
  setpageCollapse,
  Account,
  isOwned,
  setAccount,
  profileId,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [isHost, setisHost] = useState();
  const [isLoad, setisLoad] = useState(false)
  // const [Profile, setProfile] = useState()
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (Account) {
      setisHost(Account.is_host)
      setisLoad(true)
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
            {isLoad?("หน้าหลัก"):(<Skeleton/>)}
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
              {isLoad?("สุนัข"):(<Skeleton/>)}
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
              {isLoad?("รายละเอียดบริการ"):(<Skeleton/>)}
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
              {isLoad?("จัดการการบริการ"):(<Skeleton/>)}
            </NavLink>
          </NavItem>
        ) : null}

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
              {isLoad?("ตั้งค่า"):(<Skeleton/>)}
            </NavLink>
          </NavItem>
        ) : null}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <MainTab isOwned={isOwned} isHost={isHost} Account={Account} />
        </TabPane>
        {!isHost ? (
          <TabPane tabId="2">
            <DogProfileTab profileId={profileId} isOwned={isOwned} />
          </TabPane>
        ) : (
          null
        )}

        {isHost && !isOwned ? (
          <TabPane tabId="4">
            <ServiceDetailTab profileId={profileId} isOwned={isOwned}/>
          </TabPane>
        ) : (null)}


        {isHost && isOwned ? (
          <TabPane tabId="3">
            <HostServiceTab profileId={profileId} isOwned={isOwned} />
          </TabPane>
        ) : null}

        {isOwned ? (
          <TabPane tabId="5">
            <SettingTab Account={Account} setAccount={setAccount} />
          </TabPane>
        ) : null}
      </TabContent>
    </div>
  );
};

export default ProfileContent;
