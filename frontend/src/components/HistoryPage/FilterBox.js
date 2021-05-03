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
const filterStatus = [
  "ทั้งหมด",
  "กำลังรอการตอบรับ",
  "กำลังรอการจ่ายเงิน",
  "สิ้นสุดบริการ",
  "กำลังจะมาถึง",
  "อยู่ในการบริการ",
  "เลยเวลาให้บริการ",
  "ยกเลิกบริการ",
]
const color = [
  "#000000"
  ,"#5bc0de",
  ,"#0275d8",
  ,"#5cb85c",
  ,"#43978D",
  ,"#ffc107",
  ,"#f0ad4e",
  ,"#c82333"
]
export default function FilterBox({ onFilter, }) {
  const [filterIndex, setFilterIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("0");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
   
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
              // fetchMore();
            }}

          >
            <a style={{color:"black"}}>{filterStatus[0]}</a>
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
              // fetchMore();
            }}
          >
           <a style={{color:"black"}}>{filterStatus[1]}</a> 
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
              // fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterStatus[2]}</a>
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
              // fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterStatus[3]}</a>
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
              // fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterStatus[4]}</a>
          </NavLink>
        </NavItem>
        <NavItem  className="navItem5">
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
              setFilterIndex(5);
              setColorIndex(5);
              onFilter(5);
              // fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterStatus[5]}</a>
          </NavLink>
        </NavItem>
        <NavItem  className="navItem6">
          <NavLink
            className={classnames({ active: activeTab === "6" })}
            onClick={() => {
              toggle("6");
              setFilterIndex(6);
              setColorIndex(6);
              onFilter(6);
              // fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterStatus[6]}</a>
          </NavLink>
        </NavItem>
        <NavItem  className="navItem7">
          <NavLink
            className={classnames({ active: activeTab === "7" })}
            onClick={() => {
              toggle("7");
              setFilterIndex(7);
              setColorIndex(7);
              onFilter(7);
              // fetchMore();
            }}
          >
            <a style={{color:"black"}}>{filterStatus[7]}</a>
          </NavLink>
        </NavItem>
        
      </Nav>
      <br/>
    </div>
  );
}
