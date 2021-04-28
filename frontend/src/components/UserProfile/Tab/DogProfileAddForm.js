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
import DogFeedingTime from "./DogFeedingTime";

const startDogInfo = {
  customer: "",
  dog_name: "",
  gender: "",
  dog_dob: "",
  dog_breed: "",
  dog_weight: "",
  dog_status: "",
  dog_bio: "",
};

export default function DogProfileAddForm(props) {
  const { labelBtn } = props;
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [dogInfo, setDogInfo] = useState(startDogInfo);
  const [picture, setPicture] = useState("");
  const [allTimes, setAllTimes] = useState([]);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
    setDogInfo(startDogInfo);
    setPicture("");
    setAllTimes([]);
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
  function onDogImgChange(event) {
    const file = event.target.files[0];
    setPicture(file);
  }

  async function onDogSubmit(event) {
    event.preventDefault();
    console.log(dogInfo);
    console.log(allTimes);
    dogInfo.customer = 1; //test
    const resp1 = await APIDog.AddDog(dogInfo);
    setDogInfo(startDogInfo);
    if (picture !== "") {
      let form_data = new FormData();
      form_data.append("picture", picture, picture.name);
      const resp2 = await APIDog.UploadImgDog(resp1.data.id, form_data);
      props.addDogInfo(resp2.data);
      setPicture("");
    } else {
      props.addDogInfo(resp1.data);
    }
    toggle();
  }

  function changeValue(name, value) {
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false) {
      return false;
    } else if (!isNaN(value) && name !== "dog_bio") {
      return Number(value);
    } else if (value === "" && name === "picture") {
      return null;
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
                onChange={onDogImgChange}
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
              {/* <Label>อายุ</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="ระบุอายุสุนัข"
                name="dog_dob"
                value={dogInfo.dog_dob}
                onChange={onDogInfoChange}
              /> */}
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
              <DogFeedingTime allTimes={allTimes} setAllTimes={setAllTimes} />
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
          <Button color="primary" onClick={onDogSubmit}>
            ยืนยัน
          </Button>{" "}
          <Button color="secondary" onClick={toggleNested}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
