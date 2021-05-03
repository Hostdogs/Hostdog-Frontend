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
  Card,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { add, format } from "date-fns";
import "./ProgressPage.css";
import HostAPI from "../API/HostAPI";
import CustomerAPI from "../API/CustomerAPI";

import DogAPI from "../API/DogAPI"
import moment from "moment";
import "moment/locale/th";
import "./ServiceDetail.css";
import { useCookies } from "react-cookie";
export default function ServiceDetail({ onCancel, isExpand, ServiceInfo,hostInfo }) {
  const [customer, setcustomer] = useState({})
  const [host, sethost] = useState("");
  const [dog, setdog] = useState("");
  const [timeRegister, settimeRegister] = useState("");
  const [timeEnd, settimeEnd] = useState("");
  const [totalPrice,setTotalPrice]=useState(null); 
  const [mealType,setMealType]=useState(null);
  const [mealWeight,setMealWeight]=useState(null);
  const [dogFeedingTime,setDogFeedingTime]=useState([]);
  const [additionalService,setAdditionalService]=useState([]);
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  useEffect(() => {
    moment.updateLocale("th");
    if (ServiceInfo) {
      HostAPI.getHostDetails(cookies.mytoken,ServiceInfo.host.account).then((response)=>{
        sethost(response.data);
        console.log("getHostDetails")
        console.log(response.data)
      }).catch((error)=>{
        console.log("HostAPI");
        console.log(error);
      })

      CustomerAPI.getCustomerDetails(cookies.mytoken,ServiceInfo.customer.account).then((response)=>{
        setcustomer(response.data);
        console.log("getCustomerDetails")
        console.log(response.data)
      }).catch((error)=>{
        console.log("customerAPI");
        console.log(error);
      })
      DogAPI.GetOneDog(cookies.mytoken,ServiceInfo.customer.account,ServiceInfo.dog.id).then((response)=>{
        setdog(response.data);
        console.log("GetOneDog")
        console.log(response.data)
      }).catch((error)=>{
        console.log("dogAPI");
        console.log(error);
      })
      DogAPI.GetFeedingTime(cookies.mytoken,ServiceInfo.customer.account,ServiceInfo.dog.id).then((response)=>{
        setDogFeedingTime(response.data);
        console.log("GetFeedingTime");
        console.log(response.data)

      }).catch((error)=>{
        console.log("GetFeedingTime")
        console.log(error)
      })

      settimeRegister(moment(ServiceInfo.service_reg_time).format("lll"));
      settimeEnd(moment(ServiceInfo.service_end_time).format("lll"));
      setTotalPrice(ServiceInfo.total_price);
      setMealType(ServiceInfo.service_meal_type.meal_type);
      setMealWeight(ServiceInfo.service_meal_weight);

      setAdditionalService([ServiceInfo.is_dog_walk,ServiceInfo.is_get_dog,ServiceInfo.is_delivery_dog,ServiceInfo.is_bath_dog]);    
    }
  }, [ServiceInfo]);
  const listDogFeedingTime= dogFeedingTime.map((dogFeeding)=>{
return(
  <li key={dogFeeding.id}>{dogFeeding.time}</li>
)
  });


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Container className="detail-container">
        <Card style={{ borderRadius: "10px", border: "none" }}>
          <Container>
            <div
              className="UpsideText_1"
              style={{ position: "absolute", right: "10px" }}
            >
              อยู่ในการบริการ
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
              <p>การฝากจะสิ้นสุดในเวลา {moment(timeEnd).fromNow()}</p>
              <p>ค่าบริการทั้งหมด {totalPrice} บาท</p>
            </div>

            <Collapse isOpen={isExpand}>
              <Row>
                <Col>
                  <div className="DownsideText_1">
                    <p>ประเภทอาหาร: {mealType} ปริมาณ {mealWeight} กรัมต่อมื้อ</p>
                    <p>เวลาในการให้อาหาร:</p>
                    <ul>
                    {listDogFeedingTime}
                    </ul>
                  </div>
                </Col>
                <Col>
                  <div>
                    <h3 className="DownsideText_2">บริการเพิ่มเติม</h3>
                    <div className="DownsideText_3">
                      <ol>
                      {additionalService[0]?(<li>พาสุนัขไปเดินเล่น</li>):null}
                      {additionalService[1]?(<li>ให้ผู้รับฝากไปรับสุนัข</li>):null}
                      {additionalService[2]?(<li>ให้ผู้รับฝากไปส่งสุนัข</li>):null}
                      {additionalService[3]?(<li>อาบน้ำสุนัข</li>):null}
                      </ol>
                    </div>

                    <h3 className="DownsideText_2">รายละเอียดเพิ่มเติม</h3>
                    <div className="DownsideText_3">
                      <p>วันที่สร้างบริการ: </p>
                      <p>วันที่สร้างบริการ: </p>
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
              <Button onClick={toggle} color="danger">
                <div className="Cancel_Button">ยกเลิกบริการ</div>
              </Button>
              <Button
                onClick={toggle}
                color="danger"
                style={{ marginLeft: "5px" }}
              >
                <div className="Cancel_Button">ยกเลิกบริการ</div>
              </Button>
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
