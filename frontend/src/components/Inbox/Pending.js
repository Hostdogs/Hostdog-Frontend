import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Button, Container } from "reactstrap";
import "./Pending.css";
export default function Pending({service}) {
  const [customerName, setcustomerName] = useState()
  // const [hostName, sethostName] = useState()
  const [dogName, setdogName] = useState()
  const [dog, setdog] = useState()
  const [hostService, sethostService] = useState()

  useEffect(() => {
    if(service){
      setcustomerName("ผู้ฝากสุนัข: "+service.customer.first_name + " " + service.customer.last_name)
      // sethostName(service.host.first_name + " " + service.host.last_name)
      setdogName(service.dog.dog_name)
    }
  }, [service])
  console.log("task",service)
  return (
    <div className="PendingBox">
      <div className="PendingBox2">
        <Container className="container_pending">
          <div className="forUnskew">
            <h3 className="heading3">Hello This is Pending</h3>
            <ul>
              <div className="InDesktop">
                <div>{customerName||<Skeleton/>} </div>
                <div>สุนัข:</div>
                <div>รายละเอียดการบริการ:</div>
                <div>บริการที่เพิ่มเติม:</div>
              </div>
            </ul>

            <div className="InMobile">
              <div>{customerName||<Skeleton/>}</div>
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
