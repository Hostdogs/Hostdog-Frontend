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
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import DogAPI from "../../../API/DogAPI";
import moment from "moment-timezone";

export default function DogProfileEditForm(props) {
  const { labelBtn, editDogInfo } = props;
  const startDogInfo = {
    customer: editDogInfo.customer,
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
  const [picture, setPicture] = useState("");
  const [cookies] = useCookies(["mytoken", "user_id"]);
  const [preview, setPreview] = useState(null);
  const maxDate = moment(new Date()).format("YYYY-MM-DD");
  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];
  const [genderIsMale, setGenderIsMale] = useState(false);

  useEffect(() => {
    if (dogInfo.gender === "male") {
      setGenderIsMale(true);
    } else {
      setGenderIsMale(false);
    }
  }, [dogInfo]);

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
    setPreview(null);
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
    if (event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setPicture(event.target.files[0]);
    }
  }

  async function onDogUpdate(event) {
    event.preventDefault();
    try {
      const resp1 = await DogAPI.UpdateDog(
        myToken,
        myId,
        editDogInfo.id,
        dogInfo
      );
      props.updateDogInfo(resp1.data);
      if (picture !== "") {
        let form_data = new FormData();
        form_data.append("picture", picture, picture.name);
        const resp2 = await DogAPI.UploadImgDog(
          myToken,
          myId,
          resp1.data.id,
          form_data
        );
        props.updateDogInfo(resp2.data);
        setPicture("");
      }
      setPreview(null);
      toggle();
    } catch (error) {
      alert("???????????????????????????????????????????????????????????????");
    }
  } //update dog info

  function changeValue(name, value) {
    if (value === " ") {
      return "";
    }
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false) {
      return false;
    } else if (!isNaN(value) && name !== "dog_bio" && value !== "") {
      if (name === "dog_weight" && Number(value) > 100) {
        return Number(100);
      }
      if (name === "dog_weight" && Number(value) < 0) {
        return Number(1);
      }
      return Number(value);
    } else {
      return value;
    }
  }

  return (
    <div>
      <Row>
        <Col xs="12">
          <Button size="sm" color="info" onClick={toggle}>
            <FontAwesomeIcon icon={faEdit} /> {labelBtn}
          </Button>
        </Col>
      </Row>
      {editDogInfo ? (
        <Modal isOpen={modal} toggle={toggleNested}>
          <ModalHeader toggle={toggleNested}>????????????????????????????????????????????????</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                {preview ? (
                  <div style={{ textAlign: "center" }}>
                    <img className="resize-imgDog-preview" src={preview} />
                  </div>
                ) : null}
                <Label>?????????</Label>
                <Input
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={onDogImgChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>????????????</Label>
                <Input
                  placeholder="???????????????????????????????????????"
                  name="dog_name"
                  value={dogInfo.dog_name}
                  onChange={onDogInfoChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>???????????????????????????</Label>
                <Input
                  placeholder="??????????????????????????????????????????????????????"
                  name="dog_breed"
                  value={dogInfo.dog_breed}
                  onChange={onDogInfoChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>?????????</Label>
                <Row>
                  <Col xs="5" md="4">
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio"
                      name="gender"
                      label="??????????????????"
                      onChange={onDogInfoChange}
                      value="male"
                      checked={genderIsMale}
                    />
                  </Col>
                  <Col xs="5" md="4">
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio2"
                      name="gender"
                      label="?????????????????????"
                      onChange={onDogInfoChange}
                      value="female"
                      checked={!genderIsMale}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <FormGroup>
                  <Label>?????????????????????</Label>
                  <Input
                    type="date"
                    name="dog_dob"
                    max={maxDate}
                    value={dogInfo.dog_dob}
                    onChange={onDogInfoChange}
                  />
                </FormGroup>
              </FormGroup>

              <FormGroup>
                <Label>?????????????????????</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="????????????????????????????????????????????????"
                  name="dog_weight"
                  value={dogInfo.dog_weight}
                  onChange={onDogInfoChange}
                  max="100"
                  min="0"
                />
              </FormGroup>
              <FormGroup>
                <Label>?????????????????????????????????????????????</Label>
                <Input
                  type="textarea"
                  placeholder="?????????????????????????????????????????????????????????"
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
              <ModalHeader>????????????????????????????????????????????????????????????</ModalHeader>
              <ModalBody>????????????????????????????????????????????????????????????</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggleAll}>
                  ??????????????????
                </Button>{" "}
                <Button color="secondary" onClick={toggleNested}>
                  ??????????????????
                </Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onDogUpdate}>
              ??????????????????
            </Button>{" "}
            <Button color="secondary" onClick={toggleNested}>
              ??????????????????
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}
    </div>
  );
}
