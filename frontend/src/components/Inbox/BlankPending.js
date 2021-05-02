import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "reactstrap";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";
import './Pending.css'

export default function BlankPending() {
  return (
    <div style={{ paddingTop: "35px", textAlign: "center" }}>
      <Container>
        <img src="/blankPending.gif" className="blankPending"/>
        <h2>
          ดูเหมือนคุณจะยังไม่มีผู้ใช้บริการ แก้ไขโปรไฟล์ของคุณ{" "}
          <a className="mobile_br"><br/></a>
          <a href="profile/">ที่นี่</a>{" "}
          <w className="iconHand">
          <FontAwesomeIcon icon={faHandPointLeft} className="mr-2 " />
          </w>
          
        </h2>{" "}
      </Container>
    </div>
  );
}