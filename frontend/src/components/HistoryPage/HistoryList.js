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
              })
              .map((hd) => (
                <History key={hd.id} history={hd} />
              ))}
          </div>
        ) : (null)}

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
