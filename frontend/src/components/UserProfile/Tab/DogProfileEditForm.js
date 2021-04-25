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
  CustomInput,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import APIDog from "./APIDog";

export default function DogProfileEditForm(props) {
  const { labelBtn, editDogInfo } = props;
  const startDogInfo = {
    customer: editDogInfo.customer,
    picture: null,
    dog_name: editDogInfo.dog_name,
    gender: editDogInfo.gender,
    dog_dob: editDogInfo.dog_dob,
    dog_breed: editDogInfo.dog_breed,
    dog_weight: editDogInfo.dog_weight,
    dog_bio: editDogInfo.dog_bio,
  };
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [dogInfo, setDogInfo] = useState(startDogInfo);
  const toggle = () => setModal(!modal);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
    setDogInfo(startDogInfo);
  };

  function onDogInfoChange(event) {
    const { name, value } = event.target;
    setDogInfo((prevDogInfo) => {
      return {
        ...prevDogInfo,
        [name]: changeValue(name, value),
      };
    });
  }

  const onDogUpdate = (event) => {
    event.preventDefault();
    APIDog.UpdateDog(editDogInfo.id, dogInfo).then((resp) =>
      props.updateDogInfo(resp.data)
    );

    toggle();
  }; //update dog info

  function changeValue(name, value) {
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false) {
      return false;
    } else if (!isNaN(value)) {
      return Number(value);
    } else {
      return value;
    }
  }

  return (
    <div>
      <Row>
        <Col xs="12">
          <Button color="warning" onClick={toggle}>
            <FontAwesomeIcon icon={faPlus} /> {labelBtn}
          </Button>
        </Col>
      </Row>
      {editDogInfo ? (
        <Modal isOpen={modal} toggle={toggleNested}>
          <ModalHeader toggle={toggleNested}>กรอกโปรไฟล์สุนัข</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>รูป</Label>
                <Input
                  type="file"
                  name="picture"
                  accept="image/*"
                  value={dogInfo.picture}
                  onChange={onDogInfoChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>ชื่อ</Label>
                <Input
                  placeholder="ระบุชื่อสุนัข"
                  name="dog_name"
                  value={dogInfo.dog_name}
                  onChange={onDogInfoChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>สายพันธุ์</Label>
                <Input
                  placeholder="ระบุสายพันธุ์สุนัข"
                  name="dog_breed"
                  value={dogInfo.dog_breed}
                  onChange={onDogInfoChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>เพศ</Label>
                <Row>
                  <Col xs="5" md="4">
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio"
                      name="gender"
                      label="เพศผู้"
                      onChange={onDogInfoChange}
                      value="male"
                    />
                  </Col>
                  <Col xs="5" md="4">
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio2"
                      name="gender"
                      label="เพศเมีย"
                      onChange={onDogInfoChange}
                      value="female"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <FormGroup>
                  <Label>วันเกิด</Label>
                  <Input
                    type="date"
                    name="dog_dob"
                    value={dogInfo.dog_dob}
                    onChange={onDogInfoChange}
                  />
                </FormGroup>
              </FormGroup>

              <FormGroup>
                <Label>น้ำหนัก</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="ระบุน้ำหนักสุนัข"
                  name="dog_weight"
                  value={dogInfo.dog_weight}
                  onChange={onDogInfoChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>รายละเอียดสุนัข</Label>
                <Input
                  type="textarea"
                  placeholder="ระบุรายละเอียดสุนัข"
                  name="dog_bio"
                  value={dogInfo.dog_bio}
                  onChange={onDogInfoChange}
                />
              </FormGroup>
            </Form>
            <Modal
              isOpen={nestedModal}
              toggle={toggleNested}
              onClosed={closeAll ? toggle : undefined}
            >
              <ModalHeader>คุณต้องการออกหรือไม่</ModalHeader>
              <ModalBody>คุณต้องการออกหรือไม่</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggleAll}>
                  ยืนยัน
                </Button>{" "}
                <Button color="secondary" onClick={toggleNested}>
                  ยกเลิก
                </Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onDogUpdate}>
              ยืนยัน
            </Button>{" "}
            <Button color="secondary" onClick={toggleNested}>
              ยกเลิก
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}
    </div>
  );
}
