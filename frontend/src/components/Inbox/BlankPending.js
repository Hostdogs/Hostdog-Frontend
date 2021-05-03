import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './Pending.css'
import { useCookies } from "react-cookie";

export default function BlankPending() {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"])
  let urllink = ""
  useEffect(() => {
    if(cookies["user_id"]){
      urllink = `profile/${cookies["user_id"]}`
    }
  }, [cookies])
  return (
    <div style={{ paddingTop: "35px", textAlign: "center", minHeight:"35vw" }}>
      <Container>
        <img src="/blankPending.gif" className="blankPending"/>
        <h2>
          ดูเหมือนคุณจะยังไม่มีผู้ใช้บริการ แก้ไขโปรไฟล์ของคุณ{" "}
          <a className="mobile_br"><br/></a>
          <a href={urllink}>ที่นี่</a>{" "}
          <w className="iconHand">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 " style={{color:"#264d59"}}/>
          </w>
          
        </h2>{" "}
      </Container>
    </div>
  );
}
