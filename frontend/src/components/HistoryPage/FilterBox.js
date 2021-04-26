import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { useState } from "react";
import classnames from "classnames";
const filterText = [
  "ทั้งหมด",
  "บริการสำเร็จ",
  "กำลังรอการตอบรับ",
  "กำลังใช้บริการ",
  "ยกเลิกบริการ",
];
const color = ["secondary", "success", "warning", "info", "danger"];
export default function FilterBox({ onFilter, fetchMore }) {
  const [filterIndex, setFilterIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("0");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    //     <div>
    //  <UncontrolledButtonDropdown>
    //   <DropdownToggle caret color={color[colorIndex]}>
    //     {filterText[filterIndex]}
    //   </DropdownToggle>
    //   <DropdownMenu>
    //   <DropdownItem onClick={()=>{
    //     setFilterIndex(0);
    //     setColorIndex(0);
    //     onFilter(0);
    //     fetchMore();
    //     }}>{filterText[0]}</DropdownItem>
    //     <DropdownItem onClick={()=>{
    //     setFilterIndex(1);
    //     setColorIndex(1);
    //     onFilter(1);
    //     fetchMore();
    //     }}>{filterText[1]}</DropdownItem>
    //     <DropdownItem onClick={()=>{
    //     setFilterIndex(2);
    //     setColorIndex(2);
    //     onFilter(2);
    //     fetchMore();
    //     }}>{filterText[2]}</DropdownItem>
    //     <DropdownItem onClick={()=>{
    //     setFilterIndex(3);
    //     setColorIndex(3);
    //     onFilter(3);
    //     fetchMore();
    //     }}>{filterText[3]}</DropdownItem>
    //     <DropdownItem onClick={()=>{
    //     setFilterIndex(4);
    //     setColorIndex(4);
    //     onFilter(4);
    //     fetchMore();
    //     }}>{filterText[4]}</DropdownItem>
    //   </DropdownMenu>
    // </UncontrolledButtonDropdown>
    //     </div>
    <div>
      <Nav tabs style={{ cursor: "pointer"}}>
        <NavItem className="navItem0">
          <NavLink
            className={classnames({ active: activeTab === "0" })}
            onClick={() => {
              toggle("0");
              setFilterIndex(0);
              setColorIndex(0);
              onFilter(0);
              fetchMore();
            }}

          >
            <a style={{color:"black"}}>{filterText[0]}</a>
          </NavLink>
        </NavItem>
        <NavItem  className="navItem1">
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
              setFilterIndex(1);
              setColorIndex(1);
              onFilter(1);
              fetchMore();
            }}
          >
           <a style={{color:"black"}}>{filterText[1]}</a> 
          </NavLink>
        </NavItem>
        <NavItem  className="navItem2">
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
              setFilterIndex(2);
              setColorIndex(2);
              onFilter(2);
              fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterText[2]}</a>
          </NavLink>
        </NavItem>
        <NavItem  className="navItem3">
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
              setFilterIndex(3);
              setColorIndex(3);
              onFilter(3);
              fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterText[3]}</a>
          </NavLink>
        </NavItem>
        <NavItem  className="navItem4">
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
              setFilterIndex(4);
              setColorIndex(4);
              onFilter(4);
              fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterText[4]}</a>
          </NavLink>
        </NavItem>
      </Nav>
      <br/>
    </div>
  );
}
