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
import DogFeedingTime from "./DogFeedingTime";
import { useCookies } from "react-cookie";
import DogAPI from "../../../API/DogAPI";
import moment from "moment-timezone";
import "./DogTab.css";

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
  const { labelBtn, isOwned } = props;
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [dogInfo, setDogInfo] = useState(startDogInfo);
  const [picture, setPicture] = useState("");
  const [allTimes, setAllTimes] = useState([]);
  const [cookies] = useCookies(["mytoken", "user_id"]);
  const [preview, setPreview] = useState(null);

  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];

  const maxDate = moment(new Date()).format("YYYY-MM-DD");

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

  async function onDogSubmit(event) {
    console.log(maxDate);
    event.preventDefault();
    if (allTimes.length > 0) {
      try {
        const resp1 = await DogAPI.AddDog(myToken, myId, dogInfo);
        if (picture !== "") {
          let form_data = new FormData();
          form_data.append("picture", picture, picture.name);
          const resp2 = await DogAPI.UploadImgDog(
            myToken,
            myId,
            resp1.data.id,
            form_data
          );
          props.addDogInfo(resp2.data);
          setPicture("");
        } else {
          props.addDogInfo(resp1.data);
        }
        allTimes.forEach((time) => {
          DogAPI.AddFeedingTime(
            myToken,
            myId,
            resp1.data.id,
            time
          ).then((resp) => console.log(resp));
        });
        setDogInfo(startDogInfo);
        setAllTimes([]);
        toggle();
      } catch (error) {
        alert("???????????????????????????????????????????????????????????????");
      }
      setPreview(null);
    } else {
      alert("??????????????????????????????????????????????????????????????????");
    }
  }

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
          <Button
            onClick={toggle}
            style={{
              color: "black",
              backgroundColor: "#f9e07f",
              border: "0px",
              fontSize: "15px",
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="IconFaPlus" /> {labelBtn}
          </Button>
        </Col>
      </Row>

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
              <DogFeedingTime
                allTimes={allTimes}
                setAllTimes={setAllTimes}
                isOwned={isOwned}
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
          <Button color="primary" onClick={onDogSubmit}>
            ??????????????????
          </Button>{" "}
          <Button color="secondary" onClick={toggleNested}>
            ??????????????????
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
