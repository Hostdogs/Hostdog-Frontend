import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import ProgressBar from "./ProgressBar";
import React, { useState, useEffect, useCallback } from "react";
import ServiceDetail from "./ServiceDetail";
import { Collapse, Container } from "reactstrap";
import ServiceAPI from "../API/ServiceAPI";
import DogAPI from "../API/DogAPI";
import { useCookies } from "react-cookie";
import Loading from "../Handle/Loading";
import AuthenAPI from "../API/AuthenAPI";
export default function ProgressPage({ match }) {
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);

  const [progressValue, setProgressValue] = useState(0);

  const [colorIndex, setColorIndex] = useState(3);

  const [labelIndex, setLabelIndex] = useState(0);

  const [gifIndex, setGifIndex] = useState(0);
  const [showCustomerDepositPayment, setShowCustomerDepositPayment] = useState(
    false
  );
  const [showCustomerLatePayment, setshowCustomerLatePayment] = useState(false);
  const [showCustomerCancelService, setShowCustomerCancelService] = useState(
    false
  );
  const [showCustomerReview, setShowCustomerReview] = useState(false);
  const [
    showCustomerReceiveDogToEnd,
    setShowCustomerReceiveDogToEnd,
  ] = useState(false);
  const [showHostRecieveDog, setShowHostRecieveDog] = useState(false);
  const [showHostReturnDog, setHostReturnDog] = useState(false);

  const [serviceDetailStatusLabel, setServiceDetailStatusLabel] = useState("");
  const [isLoad, setisLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const toggleAlert = () => setAlertModal(!alertModal);
  const [message, setMessage] = useState("");
 

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  // setTimeout(() => {
  //   getService();
  //   console.log("send API");
  // }, 60000);

  const getService = (isHost) => {
    ServiceAPI.getService(cookies.mytoken, servicePath)
      .then((response) => {
        setServiceInfo(response.data);
        handleProgress(response.data,isHost);
        console.log(response.data);
        setisLoad(true);

      })
      .catch((error) => {
        console.log("getService");
        console.log(error);
      });
  };
  const handleHostReceiveDog = () => {
    ServiceAPI.responseService(cookies.mytoken, servicePath, {
      receive_dog: true,
    })
      .then((response) => {
        console.log("handleHostReceiveDog");
        console.log(response);
        setMessage("คุณได้ทำการรับสุนัขแล้ว");
        toggleAlert();
        checkHostOrCustomer();
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        setMessage("ไม่สามารถรับสุนัขได้");

        toggleAlert();
      });
  };
  const handleHostReturnDog = () => {
    ServiceAPI.responseService(cookies.mytoken, servicePath, {
      return_dog: true,
    })
      .then((response) => {
        console.log("handleHostReturnDog");
        console.log(response);
        setMessage("คุณได้ทำการคืนสุนัขแล้ว");
        toggleAlert();
        checkHostOrCustomer();
      })
      .catch((error) => {
        console.log("error");
        setMessage("ไม่สามารถคืนสุนัขได้");
        toggleAlert();
        console.log(error);
      });
  };
  const handleCustomerEnd_customerReceiveDog = () => {
    ServiceAPI.responseService(cookies.mytoken, servicePath, {
      receive_dog: true,
    })
      .then((response) => {
        console.log("handleCustomerEnd_customerReceiveDog");
        console.log(response);
        setMessage("คุณได้ทำการสิ้นสุดบริการ");
        toggleAlert();
        checkHostOrCustomer();
      })
      .catch((error) => {
        console.log("error");
        setMessage("ไม่สามารถทำการสิ้นสุดบริการ");
        toggleAlert();
        console.log(error);
      });
  };
  const [reviewScore, setReviewScore] = useState(5);
  const handleReview = () => {
    ServiceAPI.responseService(cookies.mytoken, servicePath, {
      review: parseInt(reviewScore),
    })
      .then((response) => {
        console.log("handleReview");
        setMessage("ขอบคุณสำหรับคะแนนบริการ");
        console.log(response);
        checkHostOrCustomer();
      })
      .catch((error) => {
        console.log("error");
        setMessage("ไม่สามารถให้คะแนนบริการ");
        console.log(error);
        toggleAlert();
      });
  };
  const handleCancel = () => {
    ServiceAPI.responseService(cookies.mytoken, servicePath, { cancel: true })
      .then((response) => {
        console.log("handleCancel");
        console.log(response);
        setMessage("คุณได้ทำการยกเลิกบริการ");
        toggleAlert();
        checkHostOrCustomer();
      })
      .catch((error) => {
        console.log("error");
        setMessage("ไม่สามารถยกเลิกบริการ");
        toggleAlert();
        console.log(error);
      });
  };
  const onChangeReview = (e) => {
    setReviewScore(e.target.value);
  };

  const handleProgress = (ServiceInfo,isHost) => {


    if (ServiceInfo.main_status === "pending") {
      if (isHost) {
        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);
        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      } else {
        setShowCustomerCancelService(true);

        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);

        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      }
      setServiceDetailStatusLabel("รอการตอบกลับ");
      setLabelIndex(0);
      setColorIndex(0);
      setGifIndex(1);
      setProgressValue(16.67);
      console.log("pending");
    } else if (ServiceInfo.main_status === "payment") {
      if (isHost) {
        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);
        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      } else {
        setShowCustomerDepositPayment(true);
        setShowCustomerCancelService(true);

        setshowCustomerLatePayment(false);

        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      }
      setServiceDetailStatusLabel("รอการชำระเงิน");
      setLabelIndex(1);
      setColorIndex(0);
      setProgressValue(32);
      setGifIndex(2);
      console.log("payment");
    } else if (ServiceInfo.main_status === "wait_for_progress") {
      if (isHost) {
        setShowHostRecieveDog(true);

        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);
        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);

        setHostReturnDog(false);
      } else {
        setShowCustomerCancelService(true);

        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);

        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      }
      setServiceDetailStatusLabel("รอเริ่มบริการ");
      setLabelIndex(2);
      setGifIndex(0);
      setProgressValue(40);
      setColorIndex(0);
    } else if (ServiceInfo.main_status === "in_progress") {
      if (isHost) {
        setHostReturnDog(true);

        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);
        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
      } else {
        setShowCustomerReceiveDogToEnd(true);

        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);
        setShowCustomerReview(false);

        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      }
      setServiceDetailStatusLabel("อยู่ในการบริการ");
      setLabelIndex(3);
      setColorIndex(0);
      setProgressValue(64);
      setGifIndex(3);
      console.log("in_progress");
    } else if (ServiceInfo.main_status === "end") {
      if (isHost) {
        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);
        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      } else {
        setShowCustomerReview(true);

        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);

        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      }
      setServiceDetailStatusLabel("สิ้นสุดบริการ");
      setLabelIndex(4);
      setColorIndex(0);
      setProgressValue(100);
      setGifIndex(5);
      console.log("end");
    } else if (ServiceInfo.main_status === "late") {
      if (isHost) {
        setHostReturnDog(true);
        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);
        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
      } else {
        setShowCustomerReceiveDogToEnd(true);
        setshowCustomerLatePayment(true);

        setShowCustomerDepositPayment(false);

        setShowCustomerCancelService(false);
        setShowCustomerReview(false);

        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      }
      setServiceDetailStatusLabel("เลยเวลาบริการ");
      console.log("late");
      setColorIndex(1);
      setProgressValue(100);
      setGifIndex(6);
      setLabelIndex(7);
    } else if (ServiceInfo.main_status === "cancelled") {
      if (isHost) {
        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);
        setShowCustomerReview(false);
        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      } else {
        setShowCustomerReview(false);
        setShowCustomerDepositPayment(false);
        setshowCustomerLatePayment(false);
        setShowCustomerCancelService(false);

        setShowCustomerReceiveDogToEnd(false);
        setShowHostRecieveDog(false);
        setHostReturnDog(false);
      }
      setServiceDetailStatusLabel("ยกเลิกบริการ");
      console.log("cancelled");
      setLabelIndex(6);
      setGifIndex(6);
      setColorIndex(1);
      setProgressValue(100);
    }
  };
  const checkHostOrCustomer = () => {
    AuthenAPI.getUserAllInfo(cookies.mytoken, cookies.user_id)
      .then((response) => {
        console.log("response.data");
        console.log(response.data);
        getService(response.data.is_host)
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };
  const printSomeThing=()=>{
    console.log("asdfasdfadf")
  }

  const [ServiceInfo, setServiceInfo] = useState(null);
  useEffect(() => {
    checkHostOrCustomer();
    setInterval(()=>checkHostOrCustomer(),60000);
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
      <NavbarIsAuth toggleSideBar={toggleSideBar} />
      <SideBar isOpen={isOpen} />
      <div style={{ minHeight: "100vh", paddingTop: "70px" }}>
        {isLoad ? (
          <div>
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
                serviceDetailStatusLabel={serviceDetailStatusLabel}
                handleCustomerEnd_customerReceiveDog={
                  handleCustomerEnd_customerReceiveDog
                }
                handleHostReceiveDog={handleHostReceiveDog}
                handleHostReturnDog={handleHostReturnDog}
                handleReview={handleReview}
                onChangeReview={onChangeReview}
                reviewScore={reviewScore}
                message={message}
                alertModal={alertModal}
                toggleAlert={toggleAlert}
                showCustomerDepositPayment={showCustomerDepositPayment}
                showCustomerLatePayment={showCustomerLatePayment}
                showCustomerCancelService={showCustomerCancelService}
                showCustomerReview={showCustomerReview}
                showCustomerReceiveDogToEnd={showCustomerReceiveDogToEnd}
                showHostRecieveDog={showHostRecieveDog}
                showHostReturnDog={showHostReturnDog}
                checkHostOrCustomer={checkHostOrCustomer}
             
              />
            </Container>
          </div>
        ) : (
          <Loading />
        )}

        {/* {!isExpand?(<div style={{height:"100px"}}></div>):(null)} */}
      </div>
      <div style={{ height: "5px" }}></div>
    </div>
  );
}
