import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Button, Card, Container } from "reactstrap";
import "./Pending.css";
export default function Pending({ service }) {
  const [customerName, setcustomerName] = useState()
  // const [hostName, sethostName] = useState()
  const [dog, setdog] = useState()
  const [hostService, sethostService] = useState()

  useEffect(() => {
    if (service) {
      setcustomerName(service.customer.first_name + " " + service.customer.last_name)
      // sethostName(service.host.first_name + " " + service.host.last_name)
 
      setdog(service.dog)
      console.log(service.dog)
    }
  }, [service])
  console.log("task", service)
  return (
    <div className="PendingBox">
      <div className="PendingBox2">
        <Container className="container_pending">
          <div className="forUnskew">
            <h3 className="heading3">คำขอบริการ: <small>{customerName}</small> </h3>
            <Card />
            {/* <ul>
              <div className="InDesktop">

                <div>
                  สุนัข: {dog.dog_name||<Skeleton/>}
                </div>
                <div>รายละเอียดการบริการ:</div>
                <div>บริการที่เพิ่มเติม:</div>
              </div>
            </ul>

            <div className="InMobile">
              <div>{customerName}</div>
              <div>สุนัข:</div>
              <div>รายละเอียดการบริการ:</div>
              <div>บริการที่เพิ่มเติม:</div>
            </div> */}
            <br />
            <Button
              style={{
                color: "black",
                border: "none",
                position: "absolute", bottom: "10px", right: "85px",
              }}
              color="warning"
            >
              ยืนยัน
            </Button>
            <Button style={{
              marginLeft: "10px", border: "none", position: "absolute", bottom: "10px", right: "10px",
              backgroundColor: "#ff0000"
            }}>
              ปฏิเสธ
            </Button>
          </div>
        </Container>
      </div>
      <br />
    </div>
  );
}
