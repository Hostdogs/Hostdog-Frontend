import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { useState } from "react";
const filterText=["ทั้งหมด","บริการสำเร็จ","กำลังรอการตอบรับ","กำลังใช้บริการ","ยกเลิกบริการ"];
const color=["secondary","success","warning","info","danger"]
export default function FilterBox({onFilter,fetchMore}) {

    const [filterIndex,setFilterIndex]=useState(0);
    const [colorIndex,setColorIndex]=useState(0);
 
    
    return (
        <div>
     <UncontrolledButtonDropdown>
      <DropdownToggle caret color={color[colorIndex]}>
        {filterText[filterIndex]}
      </DropdownToggle>
      <DropdownMenu>
      <DropdownItem onClick={()=>{
        setFilterIndex(0);
        setColorIndex(0);
        onFilter(0);
        fetchMore();
        }}>{filterText[0]}</DropdownItem>
        <DropdownItem onClick={()=>{
        setFilterIndex(1);
        setColorIndex(1);
        onFilter(1);
        fetchMore();
        }}>{filterText[1]}</DropdownItem>
        <DropdownItem onClick={()=>{
        setFilterIndex(2);
        setColorIndex(2);
        onFilter(2);
        fetchMore();
        }}>{filterText[2]}</DropdownItem>
        <DropdownItem onClick={()=>{
        setFilterIndex(3);
        setColorIndex(3);
        onFilter(3);
        fetchMore();
        }}>{filterText[3]}</DropdownItem>
        <DropdownItem onClick={()=>{
        setFilterIndex(4);
        setColorIndex(4);
        onFilter(4);
        fetchMore();
        }}>{filterText[4]}</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
        </div>
    )
}
