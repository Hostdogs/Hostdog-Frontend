import React from "react";
import { Container, Button, Spinner } from "reactstrap";
import { useState, useEffect } from "react";
import History from "./History";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBox from "./FilterBox";
import "./HistoryPage.css";

import moment from "moment";
import Loading from "../Handle/Loading";



const filterItems = [
  "all",
  "pending",
  "payment",
  "end",
  "wait_for_progress",
  "in_progress",
  "late",
  "cancelled"
];


export default function HistoryList({ serviceList }) {



  console.log(serviceList)

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

  const sortbyTime = (a,b) =>{
    let now = moment();
    let timea = moment(a.service_create_time)
    let timeb = moment(b.service_create_time)
    let diffa = now.diff(timea,"seconds")
    let diffb = now.diff(timeb,"seconds")

    if(diffa>diffb){
      return 1
    }
    if (diffa===diffb){
      return 0
    }
    if(diffb>diffa){
      return -1
    }

  }

  return (
    <>
      <br />
      {/* <InfiniteScroll
        dataLength={serviceList.length}
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
      <Container style={{ paddingTop: "70px" }}>

        <h1 style={{ color: "#264d59" }}>บริการของคุณ</h1>
        <hr style={{ borderWidth: "3px", backgroundColor: "#264d59" }} />
      </Container>
      <Container style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <FilterBox onFilter={handleFilter} />
        {serviceList ? (
          <div>
            {serviceList
              .filter((history) => {
                if (filterIndex > 0) {
                  console.log(filterIndex, "::", history)
                  return history.main_status === filterItems[filterIndex];
                } else {
                  return history;
                }
              }).sort((a, b) => sortbyTime(a,b))
              .map((hd) => (
                <History key={hd.id} history={hd} />
              ))}
          </div>
        ) : (<Loading/>)}
        

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
