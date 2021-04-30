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
import { useCookies } from "react-cookie";
export default function DogProfileTab({ profileId }) {
  const [dogInfos, setDogInfos] = useState([]);
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);

  async function getDogs() {
    const resp = await axios.get(
      `http://127.0.0.1:8000/api/profilecustomer/${profileId}/dogs/`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${cookies["mytoken"]}`,
        },
      }
    );
    console.log(resp.data);
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

  const deleteDogInfo = (dogInfo) => {
    const new_dogInfos = dogInfos.filter((myDogInfo) => {
      return myDogInfo.id !== dogInfo.id;
    });

    setDogInfos(new_dogInfos);
  };

  return (
    <div>
      <ButtonGroup style={{ marginTop: "9px" }}>
        <DogProfileAddForm labelBtn="เพิ่มสุนัข" addDogInfo={addDogInfo} />
      </ButtonGroup>
      <hr />
      <DogProfileList
        dogInfos={dogInfos}
        updateDogInfo={updateDogInfo}
        deleteDogInfo={deleteDogInfo}
      />
    </div>
  );
}
