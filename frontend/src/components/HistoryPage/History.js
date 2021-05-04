import { faAlignRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
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
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";
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
  "pending": "รอการตอบรับ",
  "payment": "รอการชำระเงิน",
  "end": "สิ้นสุดบริการ",
  "wait_for_progress": "รอเริ่มบริการ",
  "in_progress": "อยู่ในการบริการ",
  "late": "เลยเวลาให้บริการ",
  "cancelled": "ยกเลิกบริการ"
}
// const filterColor = ["#28a745", "#ffc107", "#17a2b8", "#c82333"];
const filterColor = {
  "pending": "#5bc0de",
  "payment": "#0275d8",
  "end": "#5cb85c",
  "wait_for_progress": "#43978D",
  "in_progress": "#ffc107",
  "late": "#f0ad4e",
  "cancelled": "#c82333"
}

export default function History({ history }) {
  let usehistory = useHistory()
  // const [hostName, sethostName] = useState("")
  // const [dogName, setdogName] = useState("")
  const [cookie, setCookie] = useCookies(["mytoken", "user_id"])
  const [regDate, setregDate] = useState("")
  const [endDate, setendDate] = useState("")
  const [status, setstatus] = useState("")
  const [urllink, seturllink] = useState("")
  const [createDate, setcreateDate] = useState("")
  const [showedName, setshowedName] = useState("")
  useEffect(() => {
    // HistoryAPI.fakeHostProfile(history.host_id).then(res=>{
    //   sethostName(res.first_name+" "+res.last_name)
    // })    
    // HistoryAPI.fakeDog(history.dog_id).then(res=>{
    //   setdogName(res.dog_name)
    // })
    if (history) {
      setregDate(moment(history.service_reg_time).format("lll"))
      setendDate(moment(history.service_end_time).format("lll"))
      setstatus(filterItems[history.main_status])
      seturllink("/progress/" + history.id)
      setcreateDate(moment(history.service_create_time).format("lll"))
      if (cookie["user_id"] == history.customer.account) {

        setshowedName("ผู้รับฝาก: " + history.host.first_name + " " + history.host.last_name)
      } else if (cookie["user_id"] == history.host.account) {
        setshowedName("ผู้ฝาก: " + history.customer.first_name + " " + history.customer.last_name)
      }
      console.log("history", history)
      console.log(cookie["user_id"])
      console.log("customer", history.customer.account)
      console.log("host", history.host.account)
    }


  }, [history])

  const handleInfo = (e) => {
    e.preventDefault();
    if (history.main_status === "pending") {
      usehistory.push("/")
      usehistory.go(0)
    } else {
      usehistory.push(urllink)
      usehistory.go(0)
    }

  }
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
        <a className="mobile-br"></a>
        <h6
          className="fontSizeRepo2"
          style={{ position: "absolute", top: "5px", right: "10px" }}
        >
          สร้างเมื่อ {createDate}
        </h6>
        <Row>
          <Col>
            <h3 className="fontSizeRepo3">สุนัข: {history.dog.dog_name}</h3>
          </Col>
        </Row>
        <CardText>
          <ul className="fontSizeRepo">
            <div>{showedName}</div>
            <div>วันที่เริ่มบริการ: {regDate}</div>
            <div>วันสิ้นสุดบริการ: {endDate}</div>
          </ul>
          <Row>
            <Col xs="12" sm="5" md="4" lg="4">
              <h4 className="fontSizeRepo3"
                style={{
                  color: filterColor[history.main_status],
                }}
              >
                {status}
              </h4>
            </Col>
            <Col xs="12" sm="7" md="8" lg="8">
              <Button
                className="Button2"
                style={{
                  border: "none",
                  backgroundColor:
                    filterColor[history.main_status],
                }}
                onClick={e => handleInfo(e)
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} style={""} /> รายละเอียดเพิ่มเติม
              </Button>{" "}
              <span className="Responsivedouble_br"><br/><br/></span>

              {/* <a className="mobile-br2">
                <br />
              </a>
              <Button
                className="Button2"
                style={{
                  border: "none",
                  backgroundColor:
                    filterColor[history.main_status],
                }}
              >
                -
              </Button>
              <a className="mobile-br">
                <br />
              </a>
              <a className="mobile-br2">
                <br />
              </a> */}
            </Col>
          </Row>
        </CardText>
      </Card>
    </div>
  );
}
