import {
  Container,
  Label,
  Button,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  CustomInput,
  Card,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { add, format } from "date-fns";
import "./ProgressPage.css";
import HostAPI from "../API/HostAPI";
import CustomerAPI from "../API/CustomerAPI";
import PaymentDepositModal from "../Payment/PaymentDepositModal";
import DogAPI from "../API/DogAPI";
import moment from "moment-timezone";
import "moment/locale/th";
import "./ServiceDetail.css";
import { useCookies } from "react-cookie";
import PaymentLateModal from "../Payment/PaymentLateModal";
import AlertModal from "./AlertModal";
export default function ServiceDetail({
  onCancel,
  isExpand,
  ServiceInfo,
  hostInfo,
  serviceDetailStatusLabel,
  showDepositPayment,
  showCancelService,
  showLatePayment,
  handleCustomerEnd_customerReceiveDog,
  handleHostReceiveDog,
  handleHostReturnDog,
  handleReview,
  onChangeReview,
  reviewScore,
  message,
  alertModal,
  toggleAlert,
  showCustomerDepositPayment,
  showCustomerLatePayment,
  showCustomerCancelService,
  showCustomerReview,
  showCustomerReceiveDogToEnd,
  showHostRecieveDog,
  showHostReturnDog,
  checkHostOrCustomer,
 
}) {
  const [serviceID, setServiceID] = useState(null);
  const [customer, setcustomer] = useState({});
  const [host, sethost] = useState("");
  const [dog, setdog] = useState("");
  const [timeStart, settimeStart] = useState(null);
  const [timeEnd, settimeEnd] = useState(null);
  const [serviceCreateTime, setServiceCreateTime] = useState(null);
  const [serviceHostReplyTime, setServiceHostReplyTime] = useState(null);
  const [serviceCustomerSendDogTime, setServiceCustomerSendDogTime] = useState(
    null
  );
  const [serviceCustomerGetDogTime, setServiceCustomerGetDogTime] = useState(
    null
  );
  const [totalPrice, setTotalPrice] = useState(null);
  const [mealType, setMealType] = useState(null);
  const [mealWeight, setMealWeight] = useState(null);

  const [additionalService, setAdditionalService] = useState([]);
  const [dogFeedingTime, setDogFeedingTime] = useState([]);
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    moment.updateLocale("th");
    if (ServiceInfo) {
      DogAPI.GetFeedingTime(
        cookies.mytoken,
        ServiceInfo.customer.account,
        ServiceInfo.dog.id
      )
        .then((response) => {
          setDogFeedingTime(response.data);
          console.log("GetFeedingTime");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("GetFeedingTime");
          console.log(error);
        });

      setServiceID(ServiceInfo.id);

      setTotalPrice(ServiceInfo.total_price);
      setMealType(ServiceInfo.service_meal_type.meal_type);
      setMealWeight(ServiceInfo.service_meal_weight);

      setAdditionalService([
        ServiceInfo.is_dog_walk,
        ServiceInfo.is_get_dog,
        ServiceInfo.is_delivery_dog,
        ServiceInfo.is_bath_dog,
      ]);

      setServiceCreateTime(
        moment(ServiceInfo.service_create_time).format("lll")
      );

      settimeStart(moment(ServiceInfo.service_start_time).format("lll"));
      settimeEnd(moment(ServiceInfo.service_end_time).format("lll"));

      if (ServiceInfo.service_reply_time !== null) {
        setServiceHostReplyTime(
          moment(ServiceInfo.service_reply_time).format("lll")
        );
      }
      if (ServiceInfo.service_send_time !== null) {
        setServiceCustomerSendDogTime(
          moment(ServiceInfo.service_send_time).format("lll")
        );
      }
      if (ServiceInfo.service_get_time !== null) {
        setServiceCustomerGetDogTime(
          moment(ServiceInfo.service_get_time).format("lll")
        );
      }

      setdog(ServiceInfo.dog);
      setcustomer(ServiceInfo.customer);
      sethost(ServiceInfo.host);

      let dayOne = moment(ServiceInfo.service_end_time);
      let leftDays = dayOne.diff(moment(), "days");
      let leftHours = dayOne.diff(moment(), "hours");
      let leftMinutes = dayOne.diff(moment(), "minutes");
      if (leftDays === 0 && leftHours === 0 && leftMinutes === 0) {
        setTimeLeft("ภายใน 1 นาที");
      } else if (leftDays < 0 || leftHours < 0 || leftMinutes < 0) {
        setTimeLeft("สิ้นสุดแล้ว");
      } else if (leftDays > 0) {
        setTimeLeft(String(leftDays) + " วัน");
      } else if (leftHours > 0) {
        setTimeLeft(String(leftHours) + " ชั่วโมง");
      } else {
        setTimeLeft(String(leftMinutes) + " นาที");
      }
    }
  }, [ServiceInfo]);
  const listDogFeedingTime = dogFeedingTime.sort((a,b)=>{
    return a.time.localeCompare(b.time);
  }).map((dogFeeding) => {
    return <li key={dogFeeding.id}>{dogFeeding.time} น.</li>;
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [modalEnd, setModalEnd] = useState(false);
  const toggleEnd = () => setModalEnd(!modalEnd);

  const [modalReview, setModalReview] = useState(false);

  const toggleReview = () => setModalReview(!modalReview);

  const [modalReturn, setModalReturn] = useState(false);
  const toggleReturn = () => setModalReturn(!modalReturn);

  const [modalReceive, setModalReceive] = useState(false);
  const toggleReceive = () => setModalReceive(!modalReceive);

  return (
    <div>
      <Container className="detail-container">
        <Card style={{ borderRadius: "10px", border: "none" }}>
          <Container>
            <div
              className="UpsideText_1"
              style={{ position: "absolute", right: "10px" }}
            >
              {serviceDetailStatusLabel}
            </div>
            <a className="mobile_br">
              <br />
            </a>
            <div className="UpsideText_2"> รายละเอียดการบริการ</div>
            <div className="UpsideText_p">
              <p>
                ผู้รับฝาก: {host.first_name} {host.last_name}
              </p>
              <p>
                ผู้ฝาก: {customer.first_name} {customer.last_name}
              </p>
              <p>สุนัข: {dog.dog_name}</p>
              <p>
                ฝากวันที่: {timeStart}{" "}
                <a className="mobile_br">
                  <br />
                </a>{" "}
                ถึงวันที่: {timeEnd}{" "}
              </p>
              <p>การฝากจะสิ้นสุดในเวลา: {timeLeft} </p>
              <p>ค่าบริการทั้งหมด {totalPrice} บาท</p>
            </div>

            <Collapse isOpen={isExpand}>
              <Row>
                <Col>
                  <div className="DownsideText_1">
                    <p>
                      ประเภทอาหาร: {mealType} ปริมาณ {mealWeight} กรัมต่อมื้อ
                    </p>
                    <p>เวลาในการให้อาหาร:</p>
                    <ul>{listDogFeedingTime}</ul>
                  </div>
                </Col>
                <Col>
                  <div>
                    {additionalService[0] ||
                    additionalService[1] ||
                    additionalService[2] ||
                    additionalService[3] ? (
                      <h3 className="DownsideText_2">บริการเพิ่มเติม</h3>
                    ) : null}
                    <div className="DownsideText_3">
                      <ol>
                        {additionalService[0] ? (
                          <li>พาสุนัขไปเดินเล่น</li>
                        ) : null}
                        {additionalService[1] ? (
                          <li>ให้ผู้รับฝากไปรับสุนัข</li>
                        ) : null}
                        {additionalService[2] ? (
                          <li>ให้ผู้รับฝากไปส่งสุนัข</li>
                        ) : null}
                        {additionalService[3] ? <li>อาบน้ำสุนัข</li> : null}
                      </ol>
                    </div>

                    <h3 className="DownsideText_2">รายละเอียดเพิ่มเติม</h3>
                    <div className="DownsideText_3">
                      {serviceCreateTime !== null ? (
                        <p>สร้างบริการ: {serviceCreateTime}</p>
                      ) : (
                        <p>สร้างบริการ: - </p>
                      )}

                      {serviceHostReplyTime !== null ? (
                        <p>ผู้รับฝากตอบรับ: {serviceHostReplyTime}</p>
                      ) : (
                        <p>ผู้รับฝากตอบรับ: -</p>
                      )}

                      {serviceCustomerSendDogTime !== null ? (
                        <p>ผู้ฝากฝากสุนัข: {serviceCustomerSendDogTime}</p>
                      ) : (
                        <p>ผู้ฝากฝากสุนัข: - </p>
                      )}

                      {serviceCustomerGetDogTime !== null ? (
                        <p>ผู้ฝากรับสุนัข: {serviceCustomerGetDogTime}</p>
                      ) : (
                        <p>ผู้ฝากรับสุนัข: - </p>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Collapse>
            <div
              style={{
                bottom: "10px",
                display: "flex",
                flexDirection: "row",
                float: "right",
              }}
            >
              <AlertModal
                message={message}
                alertModal={alertModal}
                alertToggle={toggleAlert}
              />
 

               {showCustomerLatePayment?(<PaymentLateModal
                service_id={serviceID}
                customer={customer}
                dog={dog}
                checkHostOrCustomer={checkHostOrCustomer}
              />):null}
              {showCustomerDepositPayment?(<PaymentDepositModal
                service_id={serviceID}
                customer={customer}
                dog={dog}
                checkHostOrCustomer={checkHostOrCustomer}
              />):null}

              {showHostRecieveDog?(<Button onClick={toggleReceive}>รับสุนัข</Button>):null}
              <Modal isOpen={modalReceive} toggle={toggleReceive}>
                <ModalHeader>กรุณายืนยันที่จะรับสุนัข</ModalHeader>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleHostReceiveDog();
                      toggleReceive();
                    }}
                  >
                    ยืนยัน
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleReceive}>
                    ยกเลิก
                  </Button>
                </ModalFooter>
              </Modal>

              {showHostReturnDog?(<Button onClick={toggleReturn}>คืนสุนัข</Button>):null}
              <Modal isOpen={modalReturn} toggle={toggleReturn}>
                <ModalHeader>กรุณายืนยันที่จะคืนสุนัข</ModalHeader>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleHostReturnDog();
                      toggleReturn();
                    }}
                  >
                    ยืนยัน
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleReturn}>
                    ยกเลิก
                  </Button>
                </ModalFooter>
              </Modal>
              {showCustomerReview?(<Button onClick={toggleReview}>ให้คะแนนผู้รับฝาก</Button>):null}
              <Modal isOpen={modalReview} fade={false} toggle={toggleReview}>
                <ModalHeader toggle={toggleReview}>
                  ให้คะแนนผู้รับฝาก
                </ModalHeader>
                <ModalBody style={{ textAlign: "center" }}>
                  <CustomInput
                    type="range"
                    id="exampleCustomRange"
                    min="1"
                    max="5"
                    name="customRange"
                    value={reviewScore}
                    onChange={onChangeReview}
                  />
                  {reviewScore} คะแนน
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleReview();
                      toggleReview();
                    }}
                  >
                    ยืนยัน
                  </Button>{" "}
                </ModalFooter>
              </Modal>
              {showCustomerReceiveDogToEnd?(<Button onClick={toggleEnd} color="danger">
                สิ้นสุดบริการ
              </Button>):null}
              <Modal isOpen={modalEnd} toggle={toggleEnd}>
                <ModalHeader>กรุณายืนยันที่จะสิ้นสุดบริการ</ModalHeader>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleCustomerEnd_customerReceiveDog();
                      toggleEnd();
                    }}
                  >
                    ยืนยัน
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleEnd}>
                    ยกเลิก
                  </Button>
                </ModalFooter>
              </Modal>
              {/* {showCancelService ? (
                <Button
                  onClick={toggle}
                  color="danger"
                  style={{ marginLeft: "5px" }}
                >
                  <div className="Cancel_Button">ยกเลิกบริการ</div>
                </Button>
              ) : null} */}
              {showCustomerCancelService?(<Button
                onClick={toggle}
                color="danger"
                style={{ marginLeft: "5px" }}
              >
                <div className="Cancel_Button">ยกเลิกบริการ</div>
              </Button>):null}
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>กรุณายืนยันที่จะยกเลิกบริการ</ModalHeader>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() => {
                      onCancel();
                      toggle();
                    }}
                  >
                    ยืนยัน
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    ยกเลิก
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </Container>
        </Card>
      </Container>

      {/* <label>รายละเอียดการบริการ</label>
        <legend>
          <p style={{marginTop:"3%"}}>ผู้รับฝาก: {detail.host}</p>
          <p>สุนัข:{detail.dog}</p>
          <p>ระยะเวลาที่ฝาก: {detail.duration} </p>
          <Collapse isOpen={isExpand}>
            <div style={{height:"40vh"}}></div>
          </Collapse>
          <Button onClick={onCancel} color="danger" style={{textAlign:"right"}}>
            ยกเลิกบริการ
          </Button>
        </legend> */}
    </div>
  );
}
