
import Host from './Host'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
export default function HostList() {
  const hostdata =[
    {
      id:1,
      hostName: "Phol",
      dateAvail:"ทุกวัน",
      distancefromCus: "25 กม.",

    },
    {
      id:2,
      hostName: "Bas",
      dateAvail:"เสาร์,อาทิตย์",
      distancefromCus: "30 กม.",
    },
    {
      id:3,
      hostName: "Pat",
      dateAvail:"จันทร์-ศุกร์",
      distancefromCus: "40 กม.",
    },
    {
      id:4,
      hostName: "Pure",
      dateAvail:"จันทร์-ศุกร์",
      distancefromCus: "50 กม.",
    }
  ] ;

  const [stateInfiniteScroll,setStateInfiniteScroll]=useState({
    items:hostdata,
    hasMore:true,
  })

  const fetchMoreData = () => {
    console.log("0");
    console.log(stateInfiniteScroll);

    if (stateInfiniteScroll.items.length >= 100) {

      setStateInfiniteScroll({ hasMore:false });
      console.log("1");
      console.log(stateInfiniteScroll);
      return;
    }
    console.log("2");
    console.log(stateInfiniteScroll);
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setStateInfiniteScroll({
        items: stateInfiniteScroll.items.concat(hostdata)
      });
      console.log("3");
      console.log(stateInfiniteScroll);
      
    }, 1500);
console.log("4");
    console.log(stateInfiniteScroll);
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
          dataLength={stateInfiniteScroll.items.length}
          next={fetchMoreData}
          hasMore={stateInfiniteScroll.hasMore}
          loader={<h4 style={{textAlign: "center"}}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>หมดแล้วครับ</b>
            </p>
          }

>
<Container className="host-container" >
        
        {stateInfiniteScroll.items.map((hd) => (
  
     
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
