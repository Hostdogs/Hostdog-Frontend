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
import APIDog from "./APIDog";

export default function DogProfileList(props) {
  const { dogInfos } = props;

  const updateDogInfo = (dogInfo) => {
    console.log(dogInfo);
    props.updateDogInfo(dogInfo);
  };

  const deleteDogInfo = (dogInfo) => {
    APIDog.DeleteDog(dogInfo.id).then(() => props.deleteDogInfo(dogInfo));
  };

  const dogElements = dogInfos.map((dogInfo) => {
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
              <CardImg Width="100%" src={dogInfo.picture} />
            </Col>
            <Col xs="12" sm="6" md="6" lg="8">
              <CardBody>
                <CardTitle tag="h5">{dogInfo.dog_name}</CardTitle>
                <CardText>
                  สายพันธุ์ : {dogInfo.dog_breed} , {gender} , วันเกิด :{" "}
                  {dogInfo.dog_dob} , น้ำหนัก : {dogInfo.dog_weight} กิโลกรัม
                </CardText>
                <CardText>
                  <p className="text-muted">รายละเอียด : {dogInfo.dog_bio}</p>
                </CardText>
                <ButtonGroup>
                  <DogProfileEditForm
                    labelBtn="แก้ไข"
                    editDogInfo={dogInfo}
                    updateDogInfo={updateDogInfo}
                  />
                </ButtonGroup>
                <Button
                  color="danger"
                  size="sm"
                  style={{ marginLeft: "15px" }}
                  onClick={() => deleteDogInfo(dogInfo)}
                >
                  ลบ
                </Button>
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