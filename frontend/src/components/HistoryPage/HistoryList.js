import React from "react";
import { Container, Button, Spinner } from "reactstrap";
import { useState, useEffect } from "react";
import History from "./History";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBox from "./FilterBox";
import "./HistoryPage.css";
import HistoryAPI from "./HistoryAPI";



const filterItems = [
  "all",
  "pending",
  "payment",
  "end",
  "wait for progress",
  "in progress",
  "late",
  "cancelled"
];


export default function HistoryList() {


  const [ServiceList, setServiceList] = useState([])

  useEffect(() => {
    HistoryAPI.fakeAllService().then(res=>{
      console.log(res)
  
        // setServiceList(ServiceList.concat(res[service]))
        // ServiceList.push(res[service])
  
        setServiceList(res)

    })
  }, [])
  console.log(ServiceList)

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
      {/* <InfiniteScroll
        dataLength={ServiceList.length}
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
            <b>end</b>
          </p>
        }
      > */}
        <Container style={{paddingTop:"70px"}}>
 
          <h1 style={{color:"#264d59"}}>บริการของคุณ</h1>
          <hr style={{ borderWidth: "3px", backgroundColor:"#264d59" }} />
        </Container>
        <Container style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <FilterBox onFilter={handleFilter} />
          {ServiceList
            .filter((history) => {
              if (filterIndex > 0) {
                console.log(filterIndex,"::",history)
                return history.service_status === filterItems[filterIndex];
              } else {
                return history;
              }
            })
            .map((hd) => (
              <History key={hd.id} history={hd} />
            ))}
        </Container>
      {/* </InfiniteScroll> */}
      <Button
        onClick={scrollToTop}
        style={{ position: "fixed", bottom: 0, right: 0 }}
      >
        ขึ้นข้างบน
      </Button>
    </>
  );
}
