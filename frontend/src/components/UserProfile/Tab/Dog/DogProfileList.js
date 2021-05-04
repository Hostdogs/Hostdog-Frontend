import React, { useState } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Row,
  Col,
  ButtonGroup,
} from "reactstrap";
import DogProfileEditForm from "./DogProfileEditForm";

import { useCookies } from "react-cookie";
import DogAPI from "../../../API/DogAPI";
import EditFeedingTime from "./EditFeedingTime";
import "./DogTab.css";
import moment from "moment-timezone";

export default function DogProfileList(props) {
  const { dogInfos, isOwned } = props;
  const [cookies] = useCookies(["mytoken", "user_id"]);

  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];

  const updateDogInfo = (dogInfo) => {
    console.log(dogInfo);
    props.updateDogInfo(dogInfo);
  };

  const deleteDogInfo = (dogInfo) => {
    DogAPI.DeleteDog(myToken, myId, dogInfo.id).then(() =>
      props.deleteDogInfo(dogInfo)
    );
  };

  const editFeedingTime = (dogInfo) => {
    DogAPI.GetFeedingTime(myToken, myId, dogInfo.id).then((resp) =>
      console.log(resp.data)
    );
  };

  const getAgemonth = (inputdob) => {
    let now = moment();
    let dob = moment(inputdob, "YYYY-MM-DD");
    let year = now.diff(dob, "years");
    dob.add(year, "years");
    let month = now.diff(dob, "months");
    if (year !== 0 && month !== 0) {
      return year + " ปี " + month + " เดือน";
    }
    if (year == 0) {
      return month + " เดือน";
    }
  };

  const dogElements = dogInfos
    .sort((dog) => {
      if (dog.dog_status === "idle") {
        return 1;
      } else {
        return -1;
      }
    })
    .map((dogInfo) => {
      let gender = "";
      if (dogInfo.gender === "male") {
        gender = "เพศ : ผู้";
      } else if (dogInfo.gender === "female") {
        gender = "เพศ : เมีย";
      }
      return (
        <div key={dogInfo.id}>
          <Card>
            <Row>
              <Col xs="12" sm="6" md="6" lg="4">
                <CardImg
                  className="resize-imgDog"
                  Width="100%"
                  src={dogInfo.picture}
                />
              </Col>
              <Col xs="12" sm="6" md="6" lg="8">
                <CardBody>
                  <CardTitle tag="h5">
                    {dogInfo.dog_name}
                    {dogInfo.dog_status === "hosting" ? (
                      <a> (อยู่ในการบริการ)</a>
                    ) : null}
                  </CardTitle>
                  <CardText>
                    <Row>
                      <Col xs="auto">สายพันธุ์ : {dogInfo.dog_breed}</Col>
                      <Col xs="auto">{gender}</Col>
                      <Col xs="auto">อายุ : {getAgemonth(dogInfo.dog_dob)}</Col>
                      <Col xs="auto">
                        น้ำหนัก : {dogInfo.dog_weight} กิโลกรัม
                      </Col>
                    </Row>
                  </CardText>
                  <CardText>
                    <p className="text-muted">รายละเอียด : {dogInfo.dog_bio}</p>
                  </CardText>
                  <ButtonGroup>
                    <EditFeedingTime
                      labelBtn="เวลาให้อาหาร"
                      dogId={dogInfo.id}
                      isOwned={isOwned}
                      dog_status={dogInfo.dog_status}
                    />
                  </ButtonGroup>
                  {isOwned && dogInfo.dog_status === "idle" ? (
                    <ButtonGroup style={{ marginLeft: "15px" }}>
                      <DogProfileEditForm
                        labelBtn="แก้ไข"
                        editDogInfo={dogInfo}
                        updateDogInfo={updateDogInfo}
                      />
                    </ButtonGroup>
                  ) : null}
                  {isOwned && dogInfo.dog_status === "idle" ? (
                    <Button
                      color="danger"
                      size="sm"
                      style={{ marginLeft: "15px" }}
                      onClick={() => deleteDogInfo(dogInfo)}
                    >
                      ลบ
                    </Button>
                  ) : null}
                </CardBody>
              </Col>
            </Row>
          </Card>
          <br />
        </div>
      );
    });

  return <div>{dogElements}</div>;
}
