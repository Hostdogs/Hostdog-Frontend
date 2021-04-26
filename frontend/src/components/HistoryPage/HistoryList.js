import React from "react";
import { Container, Button, Spinner } from "reactstrap";
import { useState, useEffect } from "react";
import History from "./History";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBox from "./FilterBox";
import "./HistoryPage.css";

const historyList = [
  {
    id: 1,
    dateStart: "24 พ.ย. 65",
    dateEnd: "25 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    dog2: "น้องบาส เล้งแซ่บ พันธุ์เห่าเก่ง",
    dog3: "น้องบาส ตกปลาอยู่ริมตลิ่ง พันธุ์หางตก",
    host: "เพียว",
    status: "บริการสำเร็จ",
  },
  {
    id: 2,
    dateStart: "24 พ.ย. 65",
    dateEnd: "25 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    dog2: "น้องบาส เล้งแซ่บ พันธุ์เห่าเก่ง",
    dog3: "น้องบาส ตกปลาอยู่ริมตลิ่ง พันธุ์หางตก",
    host: "พล",
    status: "ยกเลิกบริการ",
  },
  {
    id: 3,
    dateStart: "24 พ.ย. 65",
    dateEnd: "25 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    dog2: "น้องบาส เล้งแซ่บ พันธุ์เห่าเก่ง",
    dog3: "น้องบาส ตกปลาอยู่ริมตลิ่ง พันธุ์หางตก",
    host: "แพท",
    status: "กำลังรอการตอบรับ",
  },
  {
    id: 4,
    dateStart: "24 พ.ย. 65",
    dateEnd: "25 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    dog2: "น้องบาส เล้งแซ่บ พันธุ์เห่าเก่ง",
    dog3: "น้องบาส ตกปลาอยู่ริมตลิ่ง พันธุ์หางตก",
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

const testDataList = [
  {
    id: 5,
    dateStart: "24 พ.ย. 65",
    dateEnd: "25 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    dog2: "น้องบาส เล้งแซ่บ พันธุ์เห่าเก่ง",
    dog3: "น้องบาส ตกปลาอยู่ริมตลิ่ง พันธุ์หางตก",
    host: "เพียว",
    status: "บริการสำเร็จ",
  },
  {
    id: 6,
    dateStart: "24 พ.ย. 65",
    dateEnd: "25 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    dog2: "น้องบาส เล้งแซ่บ พันธุ์เห่าเก่ง",
    dog3: "น้องบาส ตกปลาอยู่ริมตลิ่ง พันธุ์หางตก",
    host: "พล",
    status: "ยกเลิกบริการ",
  },
  {
    id: 7,
    dateStart: "24 พ.ย. 65",
    dateEnd: "25 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    dog2: "น้องบาส เล้งแซ่บ พันธุ์เห่าเก่ง",
    dog3: "น้องบาส ตกปลาอยู่ริมตลิ่ง พันธุ์หางตก",
    host: "แพท",
    status: "กำลังรอการตอบรับ",
  },
  {
    id: 8,
    dateStart: "24 พ.ย. 65",
    dateEnd: "25 พ.ย. 65",
    dog: "น้องบาส บางขุนเทียน พันธุ์ทาง",
    dog2: "น้องบาส เล้งแซ่บ พันธุ์เห่าเก่ง",
    dog3: "น้องบาส ตกปลาอยู่ริมตลิ่ง พันธุ์หางตก",
    host: "คำนับ",
    status: "กำลังใช้บริการ",
  },
];
export default function HistoryList() {
  const [historyData, setHistoryData] = useState(historyList);

  const [hasMore, setHasMore] = useState(true);

  const [testData, setTestData] = useState(testDataList);

  const genTestData = () => {
    const newTestData = testData.map((data, index) => {
      const newId = data.id + 4;
      const updatedItem = {
        ...data,
        id: newId,
      };
      return updatedItem;
    });

    setTestData(newTestData);
  };

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
      <br />
      <InfiniteScroll
        dataLength={historyData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <h4 style={{ textAlign: "center" }}>
            <br />
            <Spinner size="lg" color="warning" />
          </h4>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>หมดแล้วครับ</b>
          </p>
        }
      >
        <Container>
          <br />
          <br />
          <br />
          <h1 style={{color:"#264d59"}}>บริการของคุณ</h1>
          <hr style={{ borderWidth: "3px", backgroundColor:"#264d59" }} />
        </Container>
        <Container style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <FilterBox onFilter={handleFilter} fetchMore={fetchMoreData} />
          {historyData
            .filter((history) => {
              if (filterIndex > 0) {
                return history.status === filterItems[filterIndex];
              } else {
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
