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

const startDogInfo = {
  customer: "",
  picture: null,
  dog_name: "",
  gender: "",
  dog_dob: "",
  dog_breed: "",
  dog_weight: "",
  dog_status: "",
  dog_bio: "",
};
export default function DogProfileAddForm() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  // console.log({name,age,weight});
  const [dogInfo, setDogInfo] = useState({
    customer: "",
    picture: null,
    dog_name: "",
    gender: "",
    dog_dob: "",
    dog_breed: "",
    dog_weight: "",
    dog_status: "",
    dog_bio: "",
  });

  function onDogInfoChange(event) {
    const { name, value } = event.target;
    setDogInfo((prevDogInfo) => {
      return {
        ...prevDogInfo,
        [name]: value,
      };
    });
  }

  const handleSubmit = () => {
    console.log(dogInfo);
    setDogInfo(startDogInfo);
    toggle();
    
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
                name="dog_name"
                value={dogInfo.dog_name}
                onChange={onDogInfoChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Age</Label>
              <Input
                placeholder="อายุ"
                name="dog_dob"
                value={dogInfo.dog_dob}
                onChange={onDogInfoChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Weight</Label>
              <Input
                placeholder="น้ำหนักของสุนัข"
                name="dog_weight"
                value={dogInfo.dog_weight}
                onChange={onDogInfoChange}
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
