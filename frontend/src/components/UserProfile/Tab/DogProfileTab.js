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
const startDogInfo = [
  {
    customer: "1",
    dog_name: "แพท",
    gender: "male",
    dog_dob: "2020-01-01",
    dog_breed: "บางขุนเทียน",
    dog_weight: "10",
    dog_status: "",
    dog_bio: "5555555555555555555555",
  },
  {
    customer: "1",
    dog_name: "แพท",
    gender: "male",
    dog_dob: "2020-01-01",
    dog_breed: "บางขุนเทียน",
    dog_weight: "10",
    dog_status: "",
    dog_bio: "5555555555555555555555",
  },
];
export default function DogProfileTab({ profileId }) {
  const [dogInfos, setDogInfos] = useState(startDogInfo);

  async function getDogs() {
    const resp = await axios.get(
      `http://127.0.0.1:8000/api/profilecustomer/${profileId}/`
    );
    setDogInfos(resp.data.dogs);
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
