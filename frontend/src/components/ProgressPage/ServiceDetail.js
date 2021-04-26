import { Container, Label, Button, Collapse } from "reactstrap";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "./ProgressPage.css";
import ProgressAPI from "./ProgressAPI";
import moment from "moment";
import 'moment/locale/th';
export default function ServiceDetail({ onCancel, isExpand, ServiceInfo }) {

  // const [customer, setcustomer] = useState({})
  const [host, sethost] = useState("")
  const [dog, setdog] = useState("")
  const [timeRegister, settimeRegister] = useState("")
  const [timeEnd, settimeEnd] = useState("")

  useEffect(() => {
    moment.updateLocale("th")
    if (ServiceInfo) {
      // ProgressAPI.fakeCustomerProfile(ServiceInfo.customer_id).then(res=>{
      //   setcustomer(res)
      // })

      ProgressAPI.fakeHostProfile(ServiceInfo.host_id).then(res => {
        sethost(res)
      })

      ProgressAPI.fakeDog(ServiceInfo.dog_id).then(res => {
        setdog(res)
      })

      settimeRegister(moment(ServiceInfo.service_reg_time).format("lll"))
      settimeEnd(moment(ServiceInfo.service_end_time).format("lll"))
    }
  }, [ServiceInfo])
  

  return (
    <div>

      <Container className="detail-container" >
        <div style={{ float: "right" }}><h4>อยู่ในการบริการ</h4></div>
        <h3> รายละเอียดการบริการ</h3>
        <p>ผู้รับฝาก: {host.first_name} {host.last_name}</p>
        <p>สุนัข: {dog.dog_name}</p>
        <p >ฝากวันที่: {timeRegister} ถึงวันที่: {timeEnd} </p>
        <p>การฝากจะสิ้นสุดในเวลา x</p>
        <p>ค่าบริการทั้งหมด x บาท</p>
        
        <Collapse isOpen={isExpand}>
          <div >
            <p>ประเภทอาหาร: x ปริมาณ x กรัมต่อมื้อ</p>
            <p>เวลาในการให้อาหาร:</p>
            <ul >
              <li>10.00</li>
            </ul>
            <h3>บริการเพิ่มเติม</h3>
              <ul>
                พาไปเดินเล่น
              </ul>
            <h3>รายละเอียดเพิ่มเติม</h3>
            <p>วันที่สร้างบริการ: </p>
            <p>วันที่สร้างบริการ: </p>
          </div>
        </Collapse>
        <div style={{ bottom: "10px", display: "flex", flexDirection: "row" }}>
          <Button onClick={onCancel} color="danger">
            ยกเลิกบริการ
        </Button>
          <Button onClick={onCancel} color="danger">
            ยกเลิกบริการ
        </Button>
        </div>



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
