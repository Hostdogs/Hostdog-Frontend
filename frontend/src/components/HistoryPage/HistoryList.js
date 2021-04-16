import React from 'react'
import {Container,Button} from 'reactstrap'
import { useState } from "react";
import History from "./History";
import InfiniteScroll from 'react-infinite-scroll-component';
const historyList=[
{
    id:1,
    date:"24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host:"เพียว",
    status: "บริการสำเร็จ",
},
{
    id:2,
    date:"24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host:"เพียว",
    status: "บริการสำเร็จ",
},
{
    id:3,
    date:"24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host:"เพียว",
    status: "บริการสำเร็จ",
},
{
    id:4,
    date:"24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host:"เพียว",
    status: "บริการสำเร็จ",
}
]
export default function HistoryList() {

    const [historyData,setHistoryData]=useState(historyList);

    const [hasMore,setHasMore]=useState(true);
  
    const fetchMoreData = () => {
   
  
      if (historyData.length >= 12) {
  
        setHasMore(false);
  
        return;
      }
  
      // a fake async api call like which sends
      // 20 more records in 1.5 secs
      setTimeout(() => {
        setHistoryData(
            historyData.concat(historyList),
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
          dataLength={historyData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{textAlign: "center"}}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>หมดแล้วครับ</b>
            </p>
          }
>

            <Container style={{maxWidth:"60vw"}}>
                <br/><br/><br/><h1>ประวัติการใช้บริการ</h1>
               {historyData.map((hd)=>(
                   <History key={hd.id} history={hd}/>
               ))}

            </Container>
            </InfiniteScroll>
            <Button onClick={scrollToTop} style={{position: "fixed", bottom: 0, right: 0}}>
ขึ้นข้างบน
        
</Button>
        </>
    )
}
