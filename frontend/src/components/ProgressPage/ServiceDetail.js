import { Container, Label, Button, Collapse } from "reactstrap";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "./ProgressPage.css";
import ProgressAPI from "./ProgressAPI";
import moment from "moment";
import 'moment/locale/th';
export default function ServiceDetail({ onCancel, isExpand, ServiceInfo }) {
  const [detail, setDetail] = useState({

  });
  // const [customer, setcustomer] = useState({})
  const [host, sethost] = useState("")
  const [dog, setdog] = useState("")
  const [timeRegister, settimeRegister] = useState("")
  const [timeEnd, settimeEnd] = useState("")

  useEffect(() => {
    moment.updateLocale("th")
    if(ServiceInfo){
      // ProgressAPI.fakeCustomerProfile(ServiceInfo.customer_id).then(res=>{
      //   setcustomer(res)
      // })

      ProgressAPI.fakeHostProfile(ServiceInfo.host_id).then(res=>{
        sethost(res)
      })

      ProgressAPI.fakeDog(ServiceInfo.dog_id).then(res=>{
        setdog(res)
      })

      settimeRegister(moment(ServiceInfo.service_reg_time).format("lll"))
      settimeEnd(moment(ServiceInfo.service_end_time).format("lll"))
    }
  }, [ServiceInfo])
  
  return (
    <div>

      <Container className="detail-container" >
        <h3> รายละเอียดการบริการ</h3>
        <p>ผู้รับฝาก: {host.name}</p>
        <p>สุนัข: {dog.dog_name}</p>
        <p>ระยะเวลาที่ฝาก: {timeRegister}</p><p> ถึงวันที่ {timeEnd} </p>
        <Collapse isOpen={isExpand}>
            <div style={{ height: "40vh" }}>
              <h3> รายละเอียดเพิ่มเติม</h3>
              <p></p>
            </div>
        </Collapse>
        <div style={{bottom:"10px",display:"flex",flexDirection:"row"}}>
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
