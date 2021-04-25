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

export default function DogProfileList(props) {
  const { dogInfos } = props;

  const updateDogInfo = (dogInfo) => {
    console.log(dogInfo);
    props.updateDogInfo(dogInfo);
  };

  const dogElements = dogInfos.map((dogInfo) => {
    return (
      <div key={dogInfo.id}>
        <Card>
          <Row>
            <Col xs="12" sm="4" md="4">
              <CardImg width="100%" src={dogInfo.picture} />
            </Col>
            <Col xs="12" sm="8" md="8">
              <CardBody>
                <CardTitle tag="h5">{dogInfo.dog_name}</CardTitle>
                <CardText>
                  {dogInfo.gender} {dogInfo.dog_breed}
                </CardText>
                <CardText>
                  <p className="text-muted">{dogInfo.dog_bio}</p>
                </CardText>
                <ButtonGroup>
                  <DogProfileEditForm
                    labelBtn="แก้ไข"
                    editDogInfo={dogInfo}
                    updateDogInfo={updateDogInfo}
                  />
                </ButtonGroup>
                <Button>ลบ</Button>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </div>
    );
  });

  return <div>{dogElements}</div>;
}
