import React from "react";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Content.css";

const ContentNoAuth = (props) => {
  return (
    <div>
      <Jumbotron style={{ paddingTop: "20vh", backgroundImage: `url(${process.env.PUBLIC_URL + '/corgi.jpg'})`, backgroundSize: "cover", backgroundPosition: "65% 20%", height: "100vh", opacity: ".85" }}>
        <div style={{opacity:"1"}}>

          <h1
            className="display-3"
            style={{ fontWeight: "bold", color: "white", textShadow: "0.5px 0.5px 2.5px black" }}
          >
            คุณกำลังมองหาพี่เลี้ยงสุนัขใช่ไหม?<br />
          ให้เราเป็นตัวช่วย
          <br />
          ในการหาพี่เลี้ยงสุนัขให้คุณ
        </h1>
          <br />
          <hr style={{ borderWidth: "3px", marginRight: "40%", backgroundColor: "white" }} />
          <br />
          <div style={{ wordWrap: "break-word", color: "white", textShadow: "0.5px 0.5px 2.5px black" }}>
            <p className="p">เว็บไซต์ฝากสุนัข<b style={{ fontSize: "30px" }}> อันดับที่ 1<small style={{ fontSize: "13px" }}> (แสน)</small> ในประเทศไทย</b></p>
          </div>

        </div>
      </Jumbotron>
    </div>
  );
};

export default ContentNoAuth;
