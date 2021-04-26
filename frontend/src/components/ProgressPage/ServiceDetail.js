import { Container, Label, Button } from "reactstrap";
import React, { useState } from "react";
import { format } from "date-fns";
import "./ProgressPage.css";
export default function ServiceDetail({ onCancel }) {
  const [detail, setDetail] = useState({
    host: "เพียว",
    dog: "น้องบาส",
    duration: "20 ก.พ. 64 - 23 ก.พ. 64",
  });
  return (
    <div>
      <br />
      <br />
      <Container className="detail-container">
        <h3> รายละเอียดการบริการ</h3>
        <p>ผู้รับฝาก: {detail.host}</p>
        <p>สุนัข:{detail.dog}</p>
        <p>ระยะเวลาที่ฝาก: {detail.duration} </p>

        <Button onClick={onCancel} color="danger">
          ยกเลิกบริการ
        </Button>

      </Container>
    </div>
  );
}
