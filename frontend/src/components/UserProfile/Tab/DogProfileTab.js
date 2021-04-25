import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "reactstrap";
import DogProfileAddForm from "./DogProfileAddForm";
import DogProfileList from "./DogProfileList";

export default function DogProfileTab() {
  const [dogInfos, setDogInfos] = useState([]);

  async function getDogs() {
    const resp = await fetch("http://127.0.0.1:8000/api/dogs/");
    const json = await resp.json();
    console.log(json);
    setDogInfos(json);
  }
  useEffect(() => {
    getDogs();
  }, []);

  const updateDogInfo = (dogInfo) => {
    const new_dogInfo = dogInfos.map((myDogInfo) => {
      if (myDogInfo.id === dogInfo.id) {
        return dogInfo;
      } else {
        return myDogInfo;
      }
    });
    setDogInfos(new_dogInfo);
  };

  return (
    <div>
      <ButtonGroup style={{ marginTop: "9px" }}>
        <DogProfileAddForm labelBtn="เพิ่มสุนัข" />
      </ButtonGroup>
      <hr />
      <DogProfileList dogInfos={dogInfos} updateDogInfo={updateDogInfo} />
    </div>
  );
}
