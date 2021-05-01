import Host from "./Host";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner
} from "reactstrap";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function HostList({hostData,setHostData}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // const [hostData, setHostData] = useState([]);
  const [ShowedHost, setShowedHost] = useState([])
  const [hasMore, setHasMore] = useState(true);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    // console.log("Hostlist Invoked")
    // SearchAPI.fakeGetHostInformation(hostData.length).then(res => {
    //   setHostData(res)
    // })
  }, [])

  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSort = (a,b) =>{
    
    if(selectedSort%2===0){
      if(a[sortcmp[selectedSort]]>b[sortcmp[selectedSort]]){
        // console.log("rtn 1")
        return 1
      }
      else if(a[sortcmp[selectedSort]]===b[sortcmp[selectedSort]]){
        // console.log("rtn 0")
        return 0
      }
      else{
        // console.log("rtn -1")
        return -1
      }
    }else{
      if(a[sortcmp[selectedSort]]>b[sortcmp[selectedSort]]){
        // console.log("rtn 1")
        return -1
      }
      else if(a[sortcmp[selectedSort]]===b[sortcmp[selectedSort]]){
        // console.log("rtn 0")
        return 0
      }
      else{
        // console.log("rtn -1")
        return 1
      }
    }
    

    
  }
  const sortcmp = ["displace","host_rating","host_area","host_area"]
  const sortingList = ["ระยะทางใกล้ที่สุด","คะแนนรีวิวสูงที่สุด","พื้นที่เลี้ยงเล็กที่สุด","พื้นที่เลี้ยงใหญ่ที่สุด","ราคา"]
  const [selectedSort, setselectedSort] = useState(0)
  // console.log(selectedSort)
  // useEffect(() => {
  //   // console.log(ShowedHost[0][sortcmp[selectedSort]]||"nothing")
  // }, [selectedSort])
  return (
    <>
      
        <Container className="host-container" fluid="xl" >
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret><FontAwesomeIcon icon={faFilter}/> {sortingList[selectedSort]}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={()=>setselectedSort(0)}>{sortingList[0]}</DropdownItem>
              <DropdownItem onClick={()=>setselectedSort(1)}>{sortingList[1]}</DropdownItem>
              <DropdownItem onClick={()=>setselectedSort(2)}>{sortingList[2]}</DropdownItem>
              <DropdownItem onClick={()=>setselectedSort(3)}>{sortingList[3]}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <br />
          {hostData.sort(
            (a,b)=> handleSort(a,b)
          )
          .map((hd) => (
            <div>
              <Host key={hd.id} host={hd} />
              <br />
            </div>
          ))}

          <Button
            onClick={scrollToTop}
            style={{ position: "fixed", bottom: 0, right: 0 }}
          >
            ขึ้นข้างบน
          </Button>
        </Container>
    
    </>
  );
}
