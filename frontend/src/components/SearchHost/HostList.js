
import Host from './Host'
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from "reactstrap";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
export default function HostList() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const hostdata =[
    {
      id:1,
      hostName: "Pholargardake Pholphol",
      dateAvail:"ทุกวัน",
      distancefromCus: "25 กม.",

    },
    {
      id:2,
      hostName: "Kumnuy Ruaypeun",
      dateAvail:"เสาร์,อาทิตย์",
      distancefromCus: "30 กม.",
    },
    {
      id:3,
      hostName: "Patpum Findingglass",
      dateAvail:"จันทร์-ศุกร์",
      distancefromCus: "40 กม.",
    },
    {
      id:4,
      hostName: "Pure9D P9deaw",
      dateAvail:"จันทร์-ศุกร์",
      distancefromCus: "50 กม.",
    }
  ] ;

  const [hostData,setHostData]=useState(hostdata);

  const [hasMore,setHasMore]=useState(true);

  const fetchMoreData = () => {
 

    if (hostData.length >= 12) {

      setHasMore(false);

      return;
    }

    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setHostData(
        hostData.concat(hostdata),
      );

      
    }, 1500);

  };

const scrollToTop=()=>{
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

  return (
    <>
    <InfiniteScroll
          dataLength={hostData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{textAlign: "center"}}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>หมดแล้วครับ</b>
            </p>
          }
>

<Container className="host-container" fluid="xl">
<Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem text>Dropdown Item Text</DropdownItem>
        <DropdownItem disabled>Action (disabled)</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Foo Action</DropdownItem>
        <DropdownItem>Bar Action</DropdownItem>
        <DropdownItem>Quo Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        {hostData.map((hd) => (
          <Host key={hd.id} host={hd}/>
        ))}

<Button onClick={scrollToTop} style={{position: "fixed", bottom: 0, right: 0}}>
ขึ้นข้างบน
        
</Button>
  
      </Container>
   
</InfiniteScroll>

    </>
  );
}
