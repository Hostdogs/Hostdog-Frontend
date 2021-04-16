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
      <Card>
      <CardBody
        style={{
          textAlign: "center",
          backgroundColor: "#ffbb3cd5",
          height: "30%",
          width:"100%"
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
    </Card>
  );
};

export default ProfileCard;
