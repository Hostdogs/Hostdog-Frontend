import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Alert,
  CardFooter,
  List
} from "reactstrap";

const ProfileCard = (props) => {
  return (
    <Card style={{maxHeight:"100%"}}>
      <CardBody
        style={{
          textAlign: "center",
          backgroundColor: "#ffbb3cd5",
          height: "45vh",
        }}
      >
        <div id="mainContainer" class="container">
          <div class="panel-body">
            <img
              src={process.env.PUBLIC_URL + "/บาสพันธุ์ทาง.png"}
              class="img-responsive center-block"
              style={{ borderRadius: "50%", width: "110px", height: "100%" }}
            />
          </div>
        </div>
        <br />
        <CardTitle tag="h3">บาส พันธุ์ทาง</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          ผู้ใช้งานทั่วไป
        </CardSubtitle>
        <br />
      </CardBody>
      <CardFooter style={{ backgroundColor: "transparent", height: "45vh" }}>
        <br />
        <CardText style={{ textAlign: "left" }}>
          <CardTitle tag="h5">รายละเอียด</CardTitle>
            <ul>
              <li>เริ่มใช้งานตั้งแต่ 31/02/64</li>
              <li>ออนไลน์ล่าสุด x ช.ม.</li>
              <li>มีสุนัขทั้งหมด x ตัว</li>
            </ul>
          <CardTitle tag="h5">คำอธิบาย</CardTitle>
          <Alert color="warning">
            <div>
              บาสนั่งตกปลาอยู่ริมตลิ่งที่บางขุนเทียน
              ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </div>
          </Alert>
        </CardText>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
