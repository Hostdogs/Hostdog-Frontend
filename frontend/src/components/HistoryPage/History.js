import { faAlignRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
  Container,
  Card,
  CardTitle,
  CardText,
  Button,
  Col,
  Row,
} from "reactstrap";

import './HistoryPage.css';
const filterItems = [
  "บริการสำเร็จ",
  "กำลังรอการตอบรับ",
  "กำลังใช้บริการ",
  "ยกเลิกบริการ",
];
const filterColor = [
  "#28a745",
  "#ffc107",
  "#17a2b8",
  "#c82333",
];

export default function History({ history, }) {
  return (
    <div>
      <Card
        body
        outline
        color="warning"
        className="history"
        style={{
          border:"none",
          background: "#fff3d0",
          height: "42vh",
          margin: "5px 0px",
        }}
      >
        <CardTitle tag="h5"></CardTitle>
        <Row>
          <Col>
            <h3 >{history.host}</h3>
          </Col>
          <Col>
            <p style={{ textAlign: "right" }}>{history.date}</p>
          </Col>
        </Row>
        <CardText>
          <p >{history.dog}</p>
          <Row>
            <Col>
              <h4 style={{color:filterColor[filterItems.indexOf(history.status)]}}>{history.status}</h4>
            </Col>
          </Row>

            <Container className="detial-container" >
              <Button
                style={{ border:"none",width: "15vw", minWidth: "100px",float:"right" ,backgroundColor:filterColor[filterItems.indexOf(history.status)]}}
              >
                รายละเอียดเพิ่มเติม
              </Button>
            </Container>

        </CardText>
      </Card>
    </div>
  );
}
