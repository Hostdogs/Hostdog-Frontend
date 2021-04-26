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

import "./HistoryPage.css";
const filterItems = [
  "บริการสำเร็จ",
  "กำลังรอการตอบรับ",
  "กำลังใช้บริการ",
  "ยกเลิกบริการ",
];
const filterColor = ["#28a745", "#ffc107", "#17a2b8", "#c82333"];

export default function History({ history }) {
  return (
    <div>
      <Card
        body
        outline
        color="warning"
        className="history"
        style={{
          border: "none",
          background: "#fff3d0",
          margin: "5px 0px",
        }}
      >
        <a className="mobile-br"></a>
        <h6
          className="fontSizeRepo2"
          style={{ position: "absolute", top: "5px", right: "10px" }}
        >
          {history.dateStart} - {history.dateEnd}
        </h6>
        <Row>
          <Col>
            <h3 className="fontSizeRepo3">{history.host}</h3>
          </Col>
        </Row>
        <CardText>
          <ul className="fontSizeRepo">
            <div>{history.dog}</div>
            <div>{history.dog2}</div>
            <div>{history.dog3}</div>
          </ul>
          <Row>
            <Col xs="12" sm="5" md="4" lg="4">
              <h4 className="fontSizeRepo3"
                style={{
                  color: filterColor[filterItems.indexOf(history.status)],
                }}
              >
                {history.status}
              </h4>
            </Col>
            <Col xs="12" sm="7" md="8" lg="8">
              <Button
                className="Button1"
                style={{
                  border: "none",
                  backgroundColor:
                    filterColor[filterItems.indexOf(history.status)],
                }}
              >
                รายละเอียดเพิ่มเติม
              </Button>{" "}
              <a className="mobile-br2">
                <br />
              </a>
              <Button
                className="Button2"
                style={{
                  border: "none",
                  backgroundColor:
                    filterColor[filterItems.indexOf(history.status)],
                }}
              >
                เฉาก๊วยอร่อย
              </Button>
              <a className="mobile-br">
                <br />
              </a>
              <a className="mobile-br2">
                <br />
              </a>
            </Col>
          </Row>
        </CardText>
      </Card>
    </div>
  );
}
