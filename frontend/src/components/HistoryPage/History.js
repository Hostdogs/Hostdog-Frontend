import { faAlignRight } from "@fortawesome/free-solid-svg-icons";
import React,{useEffect,useState} from "react";
import {
  Container,
  Card,
  CardTitle,
  CardText,
  Button,
  Col,
  Row,
} from "reactstrap";
import HistoryAPI from "./HistoryAPI";
import moment from "moment-timezone"
import "./HistoryPage.css";
// const filterItems = [
//   "ทั้งหมด",
//   "กำลังรอการตอบรับ",
//   "กำลังรอการจ่ายเงิน",
//   "สิ้นสุดบริการ",
//   "กำลังจะมาถึง",
//   "อยู่ในการบริการ",
//   "เลยเวลาให้บริการ",
//   "ยกเลิกบริการ",
// ]
const filterItems = {
  "Pending":"กำลังรอการตอบรับ",
  "Payment":"กำลังรอการจ่ายเงิน",
  "End":"สิ้นสุดบริการ",
  "Wait for progress":"ที่กำลังจะมาถึง",
  "In progress":"กำลังการบริการ",
  "Late":"เกินเวลาให้บริการ",
  "Cancelled":"ยกเลิกบริการ"
}
// const filterColor = ["#28a745", "#ffc107", "#17a2b8", "#c82333"];
const filterColor = {
  "Pending":"#5bc0de",
  "Payment":"#0275d8",
  "End":"#5cb85c",
  "Wait for progress":"#43978D",
  "In progress":"#ffc107",
  "Late":"#f0ad4e",
  "Cancelled":"#c82333"
}

export default function History({ history }) {
    const [hostName, sethostName] = useState("")
    const [dogName, setdogName] = useState("")
    const [regDate, setregDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [status, setstatus] = useState("")
  useEffect(() => {
    HistoryAPI.fakeHostProfile(history.host_id).then(res=>{
      sethostName(res.first_name+" "+res.last_name)
    })    
    HistoryAPI.fakeDog(history.dog_id).then(res=>{
      setdogName(res.dog_name)
    })
    setregDate(moment(history.service_reg_time).format("ll"))
    setendDate(moment(history.service_end_time).format("ll"))
    setstatus(filterItems[history.service_status])
    // console.log("history",history)
    
  }, [history])

  return (
    <div>
      <Card
        body
        outline
        className="history"
        style={{
          border: "5px solid #f9e07f",
          background: "#fff3d0",
          margin: "5px 0px",
        }}
      >
        {/* <a className="mobile-br"></a>
        <h6
          className="fontSizeRepo2"
          style={{ position: "absolute", top: "5px", right: "10px" }}
        >
          {regDate} - {endDate}
        </h6> */}
        <Row>
          <Col>
            <h3 className="fontSizeRepo3">สุนัขของคุณ: {dogName}</h3>
          </Col>
        </Row>
        <CardText>
          <ul className="fontSizeRepo">
            <div>ผู้ฝาก: {hostName}</div>
            <div>วันที่เริ่มบริการ: {regDate}</div>
            <div>วันสิ้นสุดบริการ: {endDate}</div>
          </ul>
          <Row>
            <Col xs="12" sm="5" md="4" lg="4">
              <h4 className="fontSizeRepo3"
                style={{
                  color: filterColor[history.service_status],
                }}
              >
                {status}
              </h4>
            </Col>
            <Col xs="12" sm="7" md="8" lg="8">
              <Button
                className="Button1"
                style={{
                  border: "none",
                  backgroundColor:
                    filterColor[history.service_status],
                }}
              >
                รายละเอียดเพิ่มเติม
              </Button>{" "}
              <a className="mobile-br2">
                <br />
              </a>
              <Button
                className="Button2"
                style={{
                  border: "none",
                  backgroundColor:
                    filterColor[history.service_status],
                }}
              >
                -
              </Button>
              <a className="mobile-br">
                <br />
              </a>
              <a className="mobile-br2">
                <br />
              </a>
            </Col>
          </Row>
        </CardText>
      </Card>
    </div>
  );
}
