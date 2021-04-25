import React from "react";
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
} from "reactstrap";

export default function DogProfileItem(props) {
  const { dogInfo } = props;
  return (
    <div>
      <Card>
        <Row>
          <Col xs="12" sm="4" md="4">
            <CardImg width="100%" src={dogInfo.picture} alt="Card image cap" />
          </Col>
          <Col xs="12" sm="8" md="8">
            <CardBody>
              <CardTitle tag="h5">{dogInfo.dog_name}</CardTitle>
              <CardText>สายพันธ์ เพศ</CardText>
              <CardText>
                <p className="text-muted">{dogInfo.dog_bio}</p>
              </CardText>
              <Button>แก้ไข</Button>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
