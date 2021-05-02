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

  useEffect(() => {
    setHostService(serviceDetail);
  }, [serviceDetail]);

  useEffect(() => {
    setSelectedDays(newAvailableDates);
  }, [newAvailableDates]);

  useEffect(() => {
    // console.log(selectedDays);
    // console.log(newAvailableDates);
  }, [selectedDays]);

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
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false) {
      return false;
    } else if (!isNaN(value) && value !== "") {
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
    // console.log(allDays);

    const resp = await HostServiceAPI.UpdateHostService(
      myToken,
      myId,
      hostService
    );

    allDays.forEach((day) => {
      HostAvailableDateAPI.AddHostAvailableDate(myToken, myId, { date: day });
    });

    dateDelete.forEach((date) => {
      HostAvailableDateAPI.DeleteHostAvailableDate(myToken, myId, date.id);
    });
    //setNewAvailableDates(selectedDays);
  }

  function onCancel(event) {
    event.preventDefault();
    setHostService(serviceDetail);
    setSelectedDays(newAvailableDates);
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
                  padding: "10px 10px",
                  color: "white",
                  borderRadius: "3%",
                }}
              >
                <FormGroup>
                  <Row>
                    <Col>
                      <h4>บริการทั่วไป</h4>
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
                        ราคาในการรับฝากสุนัขต่อวัน
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input
                          type="number"
                          name="deposit_price"
                          value={hostService.deposit_price}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                        />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                  </FormGroup>
                </div>
                <FormGroup>
                  <Row>
                    <Col xs="12" sm="12" lg="12" className="list-service">
                      วันที่ว่างในการดูแลสุนัข
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
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </div>
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" style={{ marginTop: "15px" }}>
              <div
                className="col-right-manage"
                style={{
                  backgroundColor: "#43978d",
                  padding: "10px 10px",
                  color: "white",
                  borderRadius: "3%",
                }}
              >
                <FormGroup>
                  <Row>
                    <Col>
                      <h4>บริการเพิ่มเติม</h4>
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
                      <Col xs="12" sm="5" lg="6">
                        ราคาพาสุนัขไปเดินเล่น
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input
                          type="number"
                          name="price_dog_walk"
                          value={hostService.price_dog_walk}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                          disabled={!hostService.enable_dog_walk}
                        />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <CustomInput
                          type="switch"
                          id="walk_dog"
                          name="enable_dog_walk"
                          label="พาสุนัขไปเดินเล่น"
                          onChange={onEnableChange}
                          checked={hostService.enable_dog_walk}
                        />
                      </Col>
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
                      <Col xs="12" sm="5" lg="6">
                        ราคาไปรับสุนัขต่อกิโลเมตร
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input
                          type="number"
                          name="price_get_dog"
                          value={hostService.price_get_dog}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                          disabled={!hostService.enable_get_dog}
                        />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <CustomInput
                          type="switch"
                          id="get_dog"
                          name="enable_get_dog"
                          label="ไปรับสุนัข"
                          onChange={onEnableChange}
                          checked={hostService.enable_get_dog}
                        />
                      </Col>
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
                      <Col xs="12" sm="5" lg="6">
                        ราคาไปส่งสุนัขต่อกิโลเมตร
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input
                          type="number"
                          name="price_deliver_dog"
                          value={hostService.price_deliver_dog}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                          disabled={!hostService.enable_delivery_dog}
                        />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <CustomInput
                          type="switch"
                          id="send_dog"
                          name="enable_delivery_dog"
                          label="ไปส่งสุนัข"
                          onChange={onEnableChange}
                          checked={hostService.enable_delivery_dog}
                        />
                      </Col>
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
                      <Col xs="12" sm="5" lg="6">
                        ราคาอาบน้ำสุนัข
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input
                          type="number"
                          name="price_bath_dog"
                          value={hostService.price_bath_dog}
                          onChange={onPriceChange}
                          style={{ blockSize: "30px" }}
                          disabled={!hostService.enable_bath_dog}
                        />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <CustomInput
                          type="switch"
                          id="bath_dog"
                          name="enable_bath_dog"
                          label="อาบน้ำสุนัข"
                          onChange={onEnableChange}
                          checked={hostService.enable_bath_dog}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs="6" style={{ textAlign: "end" }}>
              <Button onClick={onSubmit} color="primary">
                ยืนยัน
              </Button>
            </Col>
            <Col xs="6" style={{ textAlign: "start" }}>
              <Button onClick={onCancel} color="danger">
                ยกเลิก
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
}
