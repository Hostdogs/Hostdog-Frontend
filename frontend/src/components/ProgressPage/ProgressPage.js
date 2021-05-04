import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import ProgressBar from "./ProgressBar";
import React, { useState, useEffect, useCallback } from "react";
import ServiceDetail from "./ServiceDetail";
import { Collapse, Container } from "reactstrap";
import ServiceAPI from "../API/ServiceAPI";
import DogAPI from "../API/DogAPI"
import { useCookies } from "react-cookie";
export default function ProgressPage({ match }) {
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);

  const [progressValue, setProgressValue] = useState(0);

  const [colorIndex, setColorIndex] = useState(3);

  const [labelIndex, setLabelIndex] = useState(0);

  const [gifIndex, setGifIndex] = useState(0);
  const [showDepositPayment,setShowDepositPayment]=useState(false);
  const [showLateService,setShowLateService]=useState(false);
  const [showCancelService,setShowCancelService]=useState(true);
  const [serviceDetailStatusLabel,setServiceDetailStatusLabel]=useState("");

  
  
  // setTimeout(() => {
  //   getService();
  //   console.log("send API");
  // }, 60000);
  
  const getService =  () => {
    ServiceAPI.getService(cookies.mytoken, servicePath).then((response)=>{
      setServiceInfo(response.data);
      handleProgress(response.data);
      console.log(response.data);
    }).catch((error)=>{
      console.log("getService");
      console.log(error);
    })

 
  };
  const handleHostReceiveDog=()=>{
 
        ServiceAPI.responseService(cookies.mytoken,servicePath,{receive_dog	:true}).then((response)=>{
          console.log("handleHostReceiveDog");
          console.log(response);
        }).catch((error)=>{
          console.log("error");
          console.log(error);
        })

  }
  const handleHostReturnDog=()=>{

        ServiceAPI.responseService(cookies.mytoken,servicePath,{return_dog:true}).then((response)=>{
          console.log("handleHostReturnDog");
          console.log(response);
        }).catch((error)=>{
          console.log("error");
          console.log(error);
        })

  }
  const handleCustomerEnd_customerReceiveDog=()=>{
  
    ServiceAPI.responseService(cookies.mytoken,servicePath,{receive_dog:true}).then((response)=>{
      console.log("handleCustomerEnd_customerReceiveDog");
      console.log(response);
    }).catch((error)=>{
      console.log("error");
      console.log(error);
    })

  }
  const [reviewScore,setReviewScore]=useState(5);
  const handleReview=()=>{
 
    ServiceAPI.responseService(cookies.mytoken,servicePath,{review:parseInt(reviewScore)}).then((response)=>{
      console.log("handleReview");
      console.log(response);
    }).catch((error)=>{
      console.log("error");
      console.log(error);
    })
  }
  const handleCancel = () => {
    ServiceAPI.responseService(cookies.mytoken,servicePath,{cancel:true}).then((response)=>{
      console.log("handleCancel");
      console.log(response);
    }).catch((error)=>{
      console.log("error");
      console.log(error);
    })

  };
const onChangeReview=(e)=>{
  setReviewScore(e.target.value);

}


  const handleProgress = (ServiceInfo) => {

       if (ServiceInfo.main_status==="pending"){
        setServiceDetailStatusLabel("การส่งคำขอ");
        setShowDepositPayment(false);
        setLabelIndex(0);
        setColorIndex(0);
        setGifIndex(1);
        setProgressValue(16.67);
        console.log("pending");
      }else if(ServiceInfo.main_status==="payment"){
        setServiceDetailStatusLabel("การชำระเงิน");
        setShowDepositPayment(true);
        setLabelIndex(1);
        setColorIndex(0);
        setProgressValue(32);
        setGifIndex(2);
        console.log("payment");
      }else if(ServiceInfo.main_status==="wait_for_progress"){
        setServiceDetailStatusLabel("การรอบริการ");
        setShowDepositPayment(false);
        setLabelIndex(2);
        setGifIndex(0);
        setProgressValue(48);
        setColorIndex(0);
      }else if(ServiceInfo.main_status==="in_progress"){
        setServiceDetailStatusLabel("ในการบริการ")
        setShowDepositPayment(false);
        setLabelIndex(3);
        setColorIndex(0);
        setProgressValue(64);
        setGifIndex(3);
        console.log("in_progress");
      }else if(ServiceInfo.main_status==="end"){
        setServiceDetailStatusLabel("สิ้นสุดบริการ")
        setShowDepositPayment(false);
        setLabelIndex(4);
        setColorIndex(0);
        setProgressValue(100);
        setShowCancelService(false);
        setGifIndex(5);
        console.log("end");
      }else if(ServiceInfo.main_status==="late"){
        setServiceDetailStatusLabel("เลยเวลาบริการแล้ว")
        setShowDepositPayment(false);
        console.log("late");
        setColorIndex(1);
        setProgressValue(100);
        setShowCancelService(false);
        setShowLateService(true);
        setGifIndex(6);
        setLabelIndex(7);
      }else if(ServiceInfo.main_status==="cancelled"){
        setShowDepositPayment(false);
        setServiceDetailStatusLabel("ยกเลิกบริการ")
        console.log("cancelled");
        setLabelIndex(6);
        setGifIndex(6);
        setShowCancelService(false);
        setColorIndex(1);
      }
  };


  const [ServiceInfo, setServiceInfo] = useState(null);
  useEffect(() => {
    getService();
  }, []);


  /////////////expand info//////////////////
  const [isExpand, setisExpand] = useState(false);
  const [offset, setOffset] = useState(0);
  ///////////// get service info //////////////


  let servicePath = match.params["service_id"];

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
            showDepositPayment={showDepositPayment}
            serviceDetailStatusLabel={serviceDetailStatusLabel}
            showCancelService={showCancelService}
            showLatePayment={showLateService}

            handleCustomerEnd_customerReceiveDog={handleCustomerEnd_customerReceiveDog}
            handleHostReceiveDog={handleHostReceiveDog}
            handleHostReturnDog={handleHostReturnDog}
            handleReview={handleReview}
            
            onChangeReview={onChangeReview}
            reviewScore={reviewScore}
            />

        </Container>
        {/* {!isExpand?(<div style={{height:"100px"}}></div>):(null)} */}
      </div>
      <div style={{ height: "5px" }}></div>
    </div>
  );
}
