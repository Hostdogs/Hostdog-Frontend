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
import SearchAPI from "./SearchAPI";

export default function HostList() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [hostData, setHostData] = useState([]);
  const [ShowedHost, setShowedHost] = useState([])
  const [hasMore, setHasMore] = useState(true);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    console.log("Hostlist Invoked")
    SearchAPI.fakeGetHostInformation(hostData.length).then(res => {
      setHostData(hostData.concat(res))
    })
  }, [])

  const showMoreData = () => {
    console.log("Showmore trigger")
    setTimeout(() => {
      if (hostData.length > 0) {
        setShowedHost(ShowedHost.concat(hostData[0]))
        hostData.shift()
      } else {
        setHasMore(false)
      }
    }, 1000);



  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={ShowedHost.length}
        next={showMoreData}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: "center" }}> <Spinner size="lg" color="warning" /></h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>-------</b>
          </p>
        }
        style={{ overflowX: "hidden" }}
      >
        <Container className="host-container" fluid="xl" >
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>เรียงตามลำดับ</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>ระยะทาง</DropdownItem>
              <DropdownItem>คะแนนรีวิว</DropdownItem>
              <DropdownItem>ขนาดบริเวณเลี้ยง</DropdownItem>
              <DropdownItem>ราคา</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <br />
          {ShowedHost.map((hd) => (
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
      </InfiniteScroll>
    </>
  );
}
