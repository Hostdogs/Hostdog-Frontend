import React, { useEffect, useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  ButtonGroup,
  Input,
  Form,
  FormGroup,
  CustomInput,
  Label,
} from "reactstrap";
import "./ManageTab.css";
import SelectMultiDate from "./SelectMultiDate";
import moment from "moment-timezone";
import { useCookies } from "react-cookie";
import HostServiceAPI from "../../../API/HostServiceAPI";
import HostAvailableDateAPI from "../../../API/HostAvailableDateAPI";
import DayPicker, { DateUtils } from "react-day-picker";
import ImageBox from "./ImageBox";
import MealBox from "./MealBox";

export default function HostServiceBox(props) {
  const {
    serviceDetail,
    setNewAvailableDates,
    newAvailableDates,
    availableDates,
  } = props;

  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];
  const [hostService, setHostService] = useState(serviceDetail);
  const [selectedDays, setSelectedDays] = useState(newAvailableDates);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setHostService(serviceDetail);
  }, [serviceDetail]);

  useEffect(() => {
    setSelectedDays(newAvailableDates);
  }, [newAvailableDates]);

  function onEnableChange(event) {
    const name = event.target.name;
    const value = event.target.checked;
    setHostService((prevHostService) => {
      return {
        ...prevHostService,
        [name]: changeValue(name, value),
      };
    });
  }

  function onPriceChange(event) {
    const { name, value } = event.target;
    setHostService((prevHostService) => {
      return {
        ...prevHostService,
        [name]: changeValue(name, value),
      };
    });
  }

  function changeValue(name, value) {
    setIsChange(true);
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false) {
      return false;
    } else if (!isNaN(value) && value !== "") {
      if (Number(value) < 0) {
        return "";
      } else if (Number(value) > 10000) {
        return 10000;
      }
      return Number(value);
    } else if (value === "") {
      return null;
    } else {
      return value;
    }
  }

  function dayFormatYMD(days) {
    const allDays = [];

    days.forEach((day) => {
      allDays.push(moment(day).format("YYYY-MM-DD"));
    });
    allDays.sort(function (a, b) {
      return a.localeCompare(b);
    });
    return allDays;
  }

  function checkDeleteDate(allDays) {
    const deleteDate = availableDates.filter((date) => {
      return !allDays.includes(date.date);
    });
    return deleteDate;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const allDays = dayFormatYMD(selectedDays);
    const dateDelete = checkDeleteDate(allDays);

    const resp = await HostServiceAPI.UpdateHostService(
      myToken,
      myId,
      hostService
    );

    allDays.forEach((day) => {
      HostAvailableDateAPI.AddHostAvailableDate(myToken, myId, {
        date: day,
      }).catch((err) => {
        const mute = err;
      });
    });

    dateDelete.forEach((date) => {
      HostAvailableDateAPI.DeleteHostAvailableDate(
        myToken,
        myId,
        date.id
      ).catch((err) => {
        const mute = err;
      });
    });
    setNewAvailableDates(selectedDays);
    setIsChange(false);
  }

  function onCancel(event) {
    event.preventDefault();
    setHostService(serviceDetail);
    setSelectedDays(newAvailableDates);
    setIsChange(false);
  }

  return (
    <div>
      <Form>
        <div>
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" style={{ marginTop: "15px" }}>
              <div
                className="col-left-manage"
                style={{
                  backgroundColor: "#43978d",
                  padding: "20px 20px",
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                <FormGroup>
                  <Row>
                    <Col>
                      <h4>????????????????????????????????????</h4>
                      <hr
                        style={{
                          width: "50%",
                          margin: "0",
                          backgroundColor: "#264d59",
                        }}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="list-service">
                  <FormGroup>
                    <Row>
                      <Col xs="12" sm="5" lg="6">
                        ??????????????????????????????????????????????????????????????????????????????
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input
                          type="number"
                          name="deposit_price"
                          min="0"
                          max="10000"
                          value={hostService.deposit_price}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                        />
                      </Col>
                      <Col xs="auto">?????????</Col>
                    </Row>
                  </FormGroup>
                </div>
                <FormGroup>
                  <Row>
                    <Col xs="12" sm="12" lg="12" className="list-service">
                      ????????????????????????????????????????????????????????????????????????
                    </Col>

                    <Col
                      xs="12"
                      sm="12"
                      lg="12"
                      style={{ textAlign: "center" }}
                    >
                      <br />
                      <SelectMultiDate
                        selectedDays={selectedDays}
                        setSelectedDays={setSelectedDays}
                        setIsChange={setIsChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </div>
            </Col>
            <Col xs="12" sm="12" md="12" lg="6">
              <div
                className="col-right-manage"
                style={{
                  marginTop: "15px",
                  marginTop: "15px",
                  backgroundColor: "#43978d",
                  padding: "20px 20px",
                  color: "white",
                  borderRadius: "20px",
                  paddingBottom: "180px",
                }}
              >
                <FormGroup>
                  <Row>
                    <Col>
                      <h4>?????????????????????????????????????????????</h4>
                      <hr
                        style={{
                          width: "50%",
                          margin: "0",
                          backgroundColor: "#264d59",
                        }}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="list-service">
                  <FormGroup
                    style={{
                      color:
                        hostService.enable_dog_walk === true
                          ? "white"
                          : "#BBBBBB",
                    }}
                  >
                    <Row>
                      <Col xs="6">
                        <CustomInput
                          type="switch"
                          id="walk_dog"
                          name="enable_dog_walk"
                          label="???????????????????????????????????????????????????"
                          onChange={onEnableChange}
                          checked={hostService.enable_dog_walk}
                        />
                      </Col>
                      <Col xs="4" sm="3" lg="3">
                        <Input
                          type="number"
                          name="price_dog_walk"
                          min="0"
                          max="10000"
                          value={hostService.price_dog_walk}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                          disabled={!hostService.enable_dog_walk}
                        />
                      </Col>
                      <Col xs="auto">?????????</Col>
                    </Row>
                  </FormGroup>
                  <FormGroup
                    style={{
                      marginTop: "20px",
                      color:
                        hostService.enable_get_dog === true
                          ? "white"
                          : "#BBBBBB",
                    }}
                  >
                    <Row>
                      <Col xs="6">
                        <CustomInput
                          type="switch"
                          id="get_dog"
                          name="enable_get_dog"
                          label="??????????????????????????????"
                          onChange={onEnableChange}
                          checked={hostService.enable_get_dog}
                        />
                      </Col>
                      <Col xs="4" sm="3" lg="3">
                        <Input
                          type="number"
                          name="price_get_dog"
                          min="0"
                          max="10000"
                          value={hostService.price_get_dog}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                          disabled={!hostService.enable_get_dog}
                        />
                      </Col>
                      <Col xs="auto">?????????</Col>
                    </Row>
                  </FormGroup>
                  <FormGroup
                    style={{
                      marginTop: "20px",
                      color:
                        hostService.enable_delivery_dog === true
                          ? "white"
                          : "#BBBBBB",
                    }}
                  >
                    <Row>
                      <Col xs="6">
                        <CustomInput
                          type="switch"
                          id="send_dog"
                          name="enable_delivery_dog"
                          label="??????????????????????????????"
                          onChange={onEnableChange}
                          checked={hostService.enable_delivery_dog}
                        />
                      </Col>
                      <Col xs="4" sm="3" lg="3">
                        <Input
                          type="number"
                          name="price_deliver_dog"
                          min="0"
                          max="10000"
                          value={hostService.price_deliver_dog}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                          disabled={!hostService.enable_delivery_dog}
                        />
                      </Col>
                      <Col xs="auto">?????????</Col>
                    </Row>
                  </FormGroup>
                  <FormGroup
                    style={{
                      marginTop: "20px",
                      color:
                        hostService.enable_bath_dog === true
                          ? "white"
                          : "#BBBBBB",
                    }}
                  >
                    <Row>
                      <Col xs="6">
                        <CustomInput
                          type="switch"
                          id="bath_dog"
                          name="enable_bath_dog"
                          label="?????????????????????????????????"
                          onChange={onEnableChange}
                          checked={hostService.enable_bath_dog}
                        />
                      </Col>
                      <Col xs="4" sm="3" lg="3">
                        <Input
                          type="number"
                          name="price_bath_dog"
                          min="0"
                          max="10000"
                          value={hostService.price_bath_dog}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                          disabled={!hostService.enable_bath_dog}
                        />
                      </Col>
                      <Col xs="auto">?????????</Col>
                    </Row>
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>
          {isChange ? (
            <Row style={{ marginTop: "15px" }}>
              <Col xs="6" style={{ textAlign: "end" }}>
                <Button onClick={onSubmit} color="primary">
                  ??????????????????
                </Button>
              </Col>
              <Col xs="6" style={{ textAlign: "start" }}>
                <Button onClick={onCancel} color="danger">
                  ??????????????????
                </Button>
              </Col>
            </Row>
          ) : null}

          <hr />
          <Row>
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="6"
              style={{
                marginTop: "15px",
              }}
            >
              <ImageBox />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6">
              <MealBox />
            </Col>
          </Row>

          <hr />
        </div>
      </Form>
    </div>
  );
}
