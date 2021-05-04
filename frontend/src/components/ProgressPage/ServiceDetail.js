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
}) {
  const [serviceID, setServiceID] = useState(null);
  const [customer, setcustomer] = useState({});
  const [host, sethost] = useState("");
  const [dog, setdog] = useState("");
  const [timeRegister, settimeRegister] = useState("");
  const [timeEnd, settimeEnd] = useState("");
  const [serviceCreateTime, setServiceCreateTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [mealType, setMealType] = useState(null);
  const [mealWeight, setMealWeight] = useState(null);

  const [additionalService, setAdditionalService] = useState([]);
  const [dogFeedingTime, setDogFeedingTime] = useState([]);
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);

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
      settimeRegister(moment(ServiceInfo.service_reg_time).format("lll"));
      settimeEnd(moment(ServiceInfo.service_end_time).format("lll"));

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

      setdog(ServiceInfo.dog);
      setcustomer(ServiceInfo.customer);
      sethost(ServiceInfo.host);
    }
  }, [ServiceInfo]);
  const listDogFeedingTime = dogFeedingTime.map((dogFeeding) => {
    return <li key={dogFeeding.id}>{dogFeeding.time}</li>;
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [modalReview, setModalReview] = useState(false);

  const toggleReview = () => setModalReview(!modalReview);

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
                ฝากวันที่: {timeRegister}{" "}
                <a className="mobile_br">
                  <br />
                </a>{" "}
                ถึงวันที่: {timeEnd}{" "}
              </p>
              <p>การฝากจะสิ้นสุดในเวลา: </p>
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
                    <h3 className="DownsideText_2">บริการเพิ่มเติม</h3>
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
                      <p>วันที่สร้างบริการ: {serviceCreateTime}</p>
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
              {/* {showLatePayment?(<PaymentLateModal service_id={serviceID} customer={customer} dog={dog}/>):null}
              {showDepositPayment?(<PaymentDepositModal service_id={serviceID} customer={customer} dog={dog}/>):null} */}
              <PaymentLateModal
                service_id={serviceID}
                customer={customer}
                dog={dog}
              />{" "}
              <PaymentDepositModal
                service_id={serviceID}
                customer={customer}
                dog={dog}
              />{" "}
              <Button onClick={handleHostReceiveDog}>รับสุนัข</Button>{" "}
              <Button onClick={handleHostReturnDog}>คืนสุนัข</Button>{" "}
              <Button onClick={toggleReview}>ให้คะแนนผู้รับฝาก</Button>{" "}
              <Modal isOpen={modalReview} fade={false} toggle={toggleReview}>
                <ModalHeader toggle={toggleReview}>
                  ให้คะแนนผู้รับฝาก
                </ModalHeader>
                <ModalBody style={{textAlign:"center"}}>
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
                  <Button color="primary" onClick={handleReview}>
                    ยืนยัน
                  </Button>{" "}
                </ModalFooter>
              </Modal>
              <Button
                onClick={handleCustomerEnd_customerReceiveDog}
                color="danger"
              >
                สิ้นสุดบริการ
              </Button>{" "}
              {showCancelService ? (
                <Button
                  onClick={toggle}
                  color="danger"
                  style={{ marginLeft: "5px" }}
                >
                  <div className="Cancel_Button">ยกเลิกบริการ</div>
                </Button>
              ) : null}
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
