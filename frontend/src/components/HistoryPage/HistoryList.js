import React from "react";
import { Container, Button } from "reactstrap";
import { useState, useEffect } from "react";
import History from "./History";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBox from "./FilterBox";

const historyList = [
  {
    id: 1,
    date: "24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host: "เพียว",
    status: "บริการสำเร็จ",
  },
  {
    id: 2,
    date: "24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host: "พล",
    status: "ยกเลิกบริการ",
  },
  {
    id: 3,
    date: "24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host: "แพท",
    status: "กำลังรอการตอบรับ",
  },
  {
    id: 4,
    date: "24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host: "คำนับ",
    status: "กำลังใช้บริการ",
  },
];


const filterItems = [
  "ทั้งหมด",
  "บริการสำเร็จ",
  "กำลังรอการตอบรับ",
  "กำลังใช้บริการ",
  "ยกเลิกบริการ",
];

const testDataList=[
  {
    id: 5,
    date: "24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host: "เพียว",
    status: "บริการสำเร็จ",
  },
  {
    id: 6,
    date: "24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host: "พล",
    status: "ยกเลิกบริการ",
  },
  {
    id: 7,
    date: "24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host: "แพท",
    status: "กำลังรอการตอบรับ",
  },
  {
    id: 8,
    date: "24 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    host: "คำนับ",
    status: "กำลังใช้บริการ",
  },
]
export default function HistoryList() {

  const [historyData, setHistoryData] = useState(historyList);

  const [hasMore, setHasMore] = useState(true);

  const [testData,setTestData]=useState(testDataList);

  const genTestData=()=>{
  
  const newTestData=testData.map((data,index)=>{
    const newId=data.id+4;
    const updatedItem={
    ...data,id:newId,
  };
  return updatedItem;
  })
  
  setTestData(newTestData);
  }

  const fetchMoreData = () => {
    console.log("fetchMoreData working");
    if (historyData.length >= 24) {
      setHasMore(false);

      return;
    }

    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      genTestData();

      setHistoryData(historyData.concat(testData));
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [filterIndex, setFilterIndex] = useState(0);

  const handleFilter = (fi) => {
    setFilterIndex(fi);

  };
 
  return (
    <>
      <InfiniteScroll
        dataLength={historyData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>หมดแล้วครับ</b>
          </p>
  
        }
      > 
      <Container style={{ maxWidth: "80vw"}}>
        <br />
        <br />
        <br />
         <h1>บริการของคุณ</h1>
         </Container>
        <Container style={{ maxWidth: "80vw",background:"#ffe080",paddingTop:"10px" ,paddingBottom:"10px"  ,borderRadius:"5px"}}>
     
         
          <FilterBox onFilter={handleFilter} fetchMore={fetchMoreData}/>
          {historyData
            .filter((history)=>{
              if(filterIndex>0){
                return history.status===filterItems[filterIndex];
              }else{
                return history;
              }
            })
            .map((hd) => (
              <History key={hd.id} history={hd} />
            ))}
        </Container>
      </InfiniteScroll>
      <Button
        onClick={scrollToTop}
     
        style={{ position: "fixed", bottom: 0, right: 0 }}
      >
        ขึ้นข้างบน
      </Button>
    </>
  );
}
