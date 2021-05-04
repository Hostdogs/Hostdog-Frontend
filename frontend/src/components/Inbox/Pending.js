import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Button, Container } from "reactstrap";
import "./Pending.css";
export default function Pending({pendingTask}) {
  const [customerName, setcustomerName] = useState()
  // const [hostName, sethostName] = useState()
  const [dogName, setdogName] = useState()
  const [dog, setdog] = useState()
  const [hostService, sethostService] = useState()

  useEffect(() => {
    if(pendingTask){
      setcustomerName(pendingTask.customer.first_name + " " + pendingTask.customer.last_name)
      // sethostName(pendingTask.host.first_name + " " + pendingTask.host.last_name)
      setdogName(pendingTask.dog.dog_name)
    }
  }, [pendingTask])
  return (
    <div className="PendingBox">
      <div className="PendingBox2">
        <Container className="container_pending">
          <div className="forUnskew">
            <h3 className="heading3">Hello This is Pending</h3>
            <ul>
              <div className="InDesktop">
                <div>ผู้ฝาก: </div>
                <div>สุนัข:</div>
                <div>รายละเอียดการบริการ:</div>
                <div>บริการที่เพิ่มเติม:</div>
              </div>
            </ul>

            <div className="InMobile">
              <div>ผู้ฝาก:</div>
              <div>สุนัข:</div>
              <div>รายละเอียดการบริการ:</div>
              <div>บริการที่เพิ่มเติม:</div>
            </div>
            <br />
            <Button
              style={{
                color: "black",
                border: "none",
                position:"absolute",bottom:"10px",right:"85px",
              }}
              color="warning"
            >
              ยืนยัน
            </Button>
            <Button style={{ marginLeft: "10px", border: "none", position:"absolute",bottom:"10px",right:"10px",
                backgroundColor: "#ff0000" }}>
              ปฏิเสธ
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
