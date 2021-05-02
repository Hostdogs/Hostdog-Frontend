import React from "react";
import { Button, Container } from "reactstrap";
import "./Pending.css";
export default function Pending(pendingTask) {
  return (
    <div className="PendingBox">
      <div className="PendingBox2">
        <Container className="container_pending">
          <div className="forUnskew">
            <h3 className="heading3">Hello This is Pending</h3>
            <ul>
              <div className="InDesktop">
                <div>ผู้ฝาก:</div>
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
                color: "white",
                backgroundColor: "#264d59",
                border: "none",
              }}
            >
              ยืนยัน
            </Button>
            <Button style={{ marginLeft: "10px", border: "none" }}>
              ปฏิเสธ
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
