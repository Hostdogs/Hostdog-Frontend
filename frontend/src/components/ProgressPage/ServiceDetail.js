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
import { format } from "date-fns";
import "./ProgressPage.css";
import ProgressAPI from "./ProgressAPI";
import moment from "moment";
import "moment/locale/th";
import "./ServiceDetail.css";
export default function ServiceDetail({ onCancel, isExpand, ServiceInfo }) {
  // const [customer, setcustomer] = useState({})
  const [host, sethost] = useState("");
  const [dog, setdog] = useState("");
  const [timeRegister, settimeRegister] = useState("");
  const [timeEnd, settimeEnd] = useState("");

  useEffect(() => {
    moment.updateLocale("th");
    if (ServiceInfo) {
      // ProgressAPI.fakeCustomerProfile(ServiceInfo.customer_id).then(res=>{
      //   setcustomer(res)
      // })

      ProgressAPI.fakeHostProfile(ServiceInfo.host_id).then((res) => {
        sethost(res);
      });

      ProgressAPI.fakeDog(ServiceInfo.dog_id).then((res) => {
        setdog(res);
      });

      settimeRegister(moment(ServiceInfo.service_reg_time).format("lll"));
      settimeEnd(moment(ServiceInfo.service_end_time).format("lll"));
    }
  }, [ServiceInfo]);

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
              <p>สุนัข: {dog.dog_name}</p>
              <p>
                ฝากวันที่: {timeRegister}{" "}
                <a className="mobile_br">
                  <br />
                </a>{" "}
                ถึงวันที่: {timeEnd}{" "}
              </p>
              <p>การฝากจะสิ้นสุดในเวลา x</p>
              <p>ค่าบริการทั้งหมด x บาท</p>
            </div>

            <Collapse isOpen={isExpand}>
              <Row>
                <Col>
                  <div className="DownsideText_1">
                    <p>ประเภทอาหาร: x ปริมาณ x กรัมต่อมื้อ</p>
                    <p>เวลาในการให้อาหาร:</p>
                    <ul>
                      <li>10.00</li>
                      <li>12.00</li>
                      <li>15.00</li>
                      <li>18.00</li>
                    </ul>
                  </div>
                </Col>
                <Col>
                  <div>
                    <h3 className="DownsideText_2">บริการเพิ่มเติม</h3>
                    <div className="DownsideText_3">
                      <ol>
                        <li>พาไปเดินเล่น</li>
                        <li>ตัดขน</li>
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
