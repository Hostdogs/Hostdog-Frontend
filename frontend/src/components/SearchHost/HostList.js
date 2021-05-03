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
  Spinner,
  Label
} from "reactstrap";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Handle/Loading";

export default function HostList({ hostData, setHostData, isLoad }) {
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

  const handleSort = (a, b) => {

    if (selectedSort % 2 === 0) {
      if (a[sortcmp[selectedSort]] > b[sortcmp[selectedSort]]) {
        // console.log("rtn 1")
        return 1
      }
      else if (a[sortcmp[selectedSort]] === b[sortcmp[selectedSort]]) {
        // console.log("rtn 0")
        return 0
      }
      else {
        // console.log("rtn -1")
        return -1
      }
    } else {
      if (a[sortcmp[selectedSort]] > b[sortcmp[selectedSort]]) {
        // console.log("rtn 1")
        return -1
      }
      else if (a[sortcmp[selectedSort]] === b[sortcmp[selectedSort]]) {
        // console.log("rtn 0")
        return 0
      }
      else {
        // console.log("rtn -1")
        return 1
      }
    }



  }
  const sortcmp = ["distance", "host_rating", "host_hosted_count", "host_host_count"]
  const sortingList = ["ระยะทางใกล้ที่สุด", "คะแนนรีวิวสูงที่สุด", "ประวัติการรับฝากน้อยที่สุด","ประวัติการรับฝากมากที่สุด","อัตราค่าบริการต่ำถูกที่สุด", "อัตราค่าบริการแพงที่สุด"]
  const [selectedSort, setselectedSort] = useState(0)
  // console.log(selectedSort)
  // useEffect(() => {
  //   // console.log(ShowedHost[0][sortcmp[selectedSort]]||"nothing")
  // }, [selectedSort])
  return (
    <>

      <Container className="host-container" fluid="xl"  >
        <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ marginTop: "10px", marginBottom: "10px" }}>
          <DropdownToggle caret><FontAwesomeIcon icon={faFilter} /> {sortingList[selectedSort]}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setselectedSort(0)}>{sortingList[0]}</DropdownItem>
            <DropdownItem onClick={() => setselectedSort(1)}>{sortingList[1]}</DropdownItem>
            <DropdownItem onClick={() => setselectedSort(2)}>{sortingList[2]}</DropdownItem>
            <DropdownItem onClick={() => setselectedSort(3)}>{sortingList[3]}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {isLoad && hostData.length === 0 ? (
          <Container style={{ height: "5vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
            <Label>ขออภัย เหมือนจะไม่มีผู้ฝากตามที่คุณต้องการ</Label>

          </Container>
        ) : (null)}
        {isLoad && hostData.length > 0 ? (<div>
          {hostData.sort(
            (a, b) => handleSort(a, b)
          )
            .map((hd) => (
              <div>
                <Host key={hd.id} host={hd} />
                <br />
              </div>
            ))}
        </div>

        ) : (null)}

        {!isLoad ? (<Loading />) : (null)}
        <div style={{ textAlign: "center"}}>
          <Label>- - - - - - - - - - - - - - - - - - </Label>
        </div>


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
