import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Alert,
  CardFooter,
  List,
  Collapse
} from "reactstrap";

const ProfileCard = ({pageCollapse}) => {
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
        <Collapse isOpen={pageCollapse}>
        <div id="mainContainer" class="container">
          <div class="panel-body">
            <br/>
            <img
              src={process.env.PUBLIC_URL + "/user_placeholder.png"}
              class="img-responsive center-block"
              style={{ borderRadius: "50%", width: "120px", height: "100%" }}
            />
          </div>
        </div>
        </Collapse>
        
        <br />
        <CardTitle tag="h3">ควยแพท</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          ผู้ใช้งานทั่วไป
        </CardSubtitle>
        <Collapse isOpen={pageCollapse}>
          <br/>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
