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
import axios from "axios";

export default function DogProfileTab() {
  const [dogInfos, setDogInfos] = useState([]);

  async function getDogs() {
    const resp = await axios.get("http://127.0.0.1:8000/api/dogs/");
    setDogInfos(resp.data);
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

  const addDogInfo = (dogInfo) => {
    console.log(dogInfo);
    const new_dogInfos = [...dogInfos, dogInfo];
    setDogInfos(new_dogInfos);
  };

  return (
    <div>
      <ButtonGroup style={{ marginTop: "9px" }}>
        <DogProfileAddForm labelBtn="เพิ่มสุนัข" addDogInfo={addDogInfo} />
      </ButtonGroup>
      <hr />
      <DogProfileList dogInfos={dogInfos} updateDogInfo={updateDogInfo} />
    </div>
  );
}
