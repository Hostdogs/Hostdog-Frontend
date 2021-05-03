import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import ProgressBar from "./ProgressBar";
import React, { useState, useEffect, useCallback } from "react";
import ServiceDetail from "./ServiceDetail";
import { Collapse, Container } from "reactstrap";
import ServiceAPI from "../API/ServiceAPI";

import { useCookies } from "react-cookie";
export default function ProgressPage({ match }) {
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);

  const [progressValue, setProgressValue] = useState(0);

  const [colorIndex, setColorIndex] = useState(3);

  const [labelIndex, setLabelIndex] = useState(0);

  const [gifIndex, setGifIndex] = useState(0);



  const getService =  () => {
    ServiceAPI.getService(cookies.mytoken, servicePath).then((response)=>{
      setServiceInfo(response.data);
      console.log(response.data);
    }).catch((error)=>{
      console.log("getService");
      console.log(error);
    })

  };

 
  const handleProgress = () => {
    if (progressValue >= 100 || gifIndex >= 6) {
      setLabelIndex(0);
      setProgressValue(16.67);
      setColorIndex(3);
      setGifIndex(0);
    } else {
      setLabelIndex(labelIndex + 1);
      setColorIndex(3);
      setProgressValue(progressValue + 16.67);
      setGifIndex(gifIndex + 1);
    }
  };
  const handleCancel = () => {
    setColorIndex(4);
    setLabelIndex(6);
    setGifIndex(6);
  };
  useEffect(() => {
    setProgressValue(progressValue + 16.67);
    getService();
  }, []);

  /////////////expand info//////////////////
  const [isExpand, setisExpand] = useState(false);
  const [offset, setOffset] = useState(0);
  ///////////// get service info //////////////
  const [ServiceInfo, setServiceInfo] = useState(null);

  let servicePath = match.params["service_id"];
  useEffect(() => {
    // ProgressAPI.fakeServiceProgress(servicePath).then(res => {
    //   setServiceInfo(res)
    // })
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > offset) {
        setisExpand(true);
      } else if (window.pageYOffset === 0) {
        setisExpand(false);
      }
      setOffset(window.pageYOffset);
      // console.log(window.pageYOffset,"::",offset)
    };
  }, [offset]);

  return (
    <div style={{ backgroundColor: "#fdf2ca" }}>
      <NavbarIsAuth />
      <div style={{ minHeight: "100vh", paddingTop: "70px" }}>
        <ProgressBar
          progressValue={progressValue}
          colorIndex={colorIndex}
          labelIndex={labelIndex}
          gifIndex={gifIndex}
          handleProgress={handleProgress}
        />

        <br />

        <Container fluid="lg">
          <ServiceDetail
            onCancel={handleCancel}
            isExpand={isExpand}
            ServiceInfo={ServiceInfo}
      
          />
        </Container>
        {/* {!isExpand?(<div style={{height:"100px"}}></div>):(null)} */}
      </div>
      <div style={{ height: "5px" }}></div>
    </div>
  );
}
