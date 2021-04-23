import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function DogProfileAddForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [dogInfo, setDogInfo] = useState({
    customer: null,
    picture: null,
    dog_name: "",
    gender: "",
    dog_dob: null,
    dog_breed: "",
    dog_weight: null,
    dog_status: null,
    dog_bio: null,
  });
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  // console.log({name,age,weight});
  const handleSubmit = () => {
    console.log(dogInfo);
  };

  return (
    <div>
      <Row>
        <Col xs="12">
          <Button color="warning" onClick={toggle}>
            <FontAwesomeIcon icon={faPlus} /> เพิ่มสุนัข
          </Button>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>กรอกโปรไฟล์สุนัข</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input
                placeholder="ชื่อสุนัขของคุณ"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Age</Label>
              <Input
                placeholder="อายุ"
                onChange={(e) => setAge(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Weight</Label>
              <Input
                placeholder="น้ำหนักของสุนัข"
                onChange={(e) => setWeight(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
