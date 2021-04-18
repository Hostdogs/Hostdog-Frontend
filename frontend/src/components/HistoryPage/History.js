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
const filterItems = [
  "บริการสำเร็จ",
  "กำลังรอผู้รับฝากตอบรับ",
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
          background: "#fff3d0",
          height: "40vh",
          margin: "5px 0px",
        }}
      >
        <CardTitle tag="h5"></CardTitle>
        <Row>
          <Col>
            <h3>ผู้รับฝากสุนัข:{history.host}</h3>
          </Col>
          <Col>
            <p style={{ textAlign: "right" }}>วันที่ใช้บริการ:{history.date}</p>
          </Col>
        </Row>
        <CardText>
          <p>สุนัข:{history.dog}</p>
          <Row>
            <Col>
              <h4 style={{color:filterColor[filterItems.indexOf(history.status)]}}>{history.status}</h4>
            </Col>
          </Row>

            <Container >
              <Button
                style={{ width: "15vw", minWidth: "100px", float: "right" ,backgroundColor:filterColor[filterItems.indexOf(history.status)]}}
              >
                รายละเอียดเพิ่มเติม
              </Button>
            </Container>

        </CardText>
      </Card>
    </div>
  );
}
