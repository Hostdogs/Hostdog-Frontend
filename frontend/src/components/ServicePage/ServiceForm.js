import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./Service.css";
import ServiceDetail from "./ServiceDetail";

export default function ServiceForm() {
  const [dropdownTypeOpen, setTypeOpen] = useState(false);
  const toggleType = () => setTypeOpen(!dropdownTypeOpen);

  const [dropdownFreqOpen, setFreqOpen] = useState(false);
  const toggleFreq = () => setFreqOpen(!dropdownFreqOpen);

  const mealPerDays = [
    { label: "1 ครั้ง/วัน", value: 1 },
    { label: "2 ครั้ง/วัน", value: 2 },
    { label: "3 ครั้ง/วัน", value: 3 },
    { label: "4 ครั้ง/วัน", value: 4 },
    { label: "5 ครั้ง/วัน", value: 5 },
  ];

  const mealTypes = [
    { label: "อาหารเปียก", value: 1, key: 1 },
    { label: "อาหารแห้ง", value: 2, key: 2 },
    { label: "เนื้อสด", value: 3, key: 3 },
  ];

  const [serviceInfo, setServiceInfo] = useState({
    host: null,
    customer: null,
    dog: null,
    service_status: "",
    service_is_over_night: null,
    service_start_time: null,
    service_end_time: null,
    service_send_time: null,
    service_get_time: null,
    service_meal_type: null,
    service_meal_per_day: null,
    service_meal_weight: 100,
    service_is_walk: null,
    service_is_get_dog: null,
    service_is_deliver_dog: null,
    service_is_dog_bath: null,
    service_bio: "",
    service_is_rating: false,
    service_rating: null,
  });

  function changeValue(name, value) {
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false) {
      return false;
    } else if (!isNaN(value) && name !== "service_bio") {
      return Number(value);
    } else {
      return value;
    }
  }
  function onServiceInfoChange(event) {
    const { name, value } = event.target;
    setServiceInfo((prevServiceInfo) => {
      return {
        ...prevServiceInfo,
        [name]: changeValue(name, value),
      };
    });
  }

  useEffect(() => {
    console.log(serviceInfo);
  }, [serviceInfo]);

  const mealPerDayElements = mealPerDays.map((mealPerDay, index) => {
    return (
      <DropdownItem
        key={index}
        name="service_meal_per_day"
        value={mealPerDay.value}
        onClick={onServiceInfoChange}
      >
        {mealPerDay.label}
      </DropdownItem>
    );
  });

  const mealTypeElements = mealTypes.map((mealType, index) => {
    return (
      <DropdownItem
        key={mealType.key}
        name="service_meal_type"
        value={mealType.value}
        onClick={onServiceInfoChange}
      >
        {mealType.label}
      </DropdownItem>
    );
  });

  function onServiceSubmit(event) {
    event.preventDefault();
    if (serviceInfo.host === null) {
      console.log("host");
    }
    if (serviceInfo.customer === null) {
      console.log("customer");
    }
    if (serviceInfo.dog === null) {
      console.log("dog");
    }
    if (serviceInfo.service_is_over_night === null) {
      console.log("service_is_over_night");
    }
    if (serviceInfo.service_meal_type === null) {
      console.log("service_meal_type");
    }
    if (serviceInfo.service_meal_per_day === null) {
      console.log("service_meal_per_day");
    }
    //console.log(serviceInfo);
  }

  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" lg="8">
          <Form>
            <FormGroup>
              <h4>เลือกบริการของคุณ</h4>
            </FormGroup>
            <div className="list-service">
              <FormGroup>
                <Row>
                  <Col xs="7" sm="4">
                    เลือกสุนัขของคุณ
                  </Col>
                  <Col xs="5" sm="4">
                    <Button color="primary" size="sm">
                      เลือก
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ผู้รับฝาก
                  </Col>
                  <Col xs="12" sm="6">
                    นายคำนวย บางขุนเทียน
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ประเภทการฝาก
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="DeTypeRadio"
                      name="service_is_over_night"
                      label="ฝากระหว่างวัน"
                      value="false"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="DeTypeRadio2"
                      name="service_is_over_night"
                      label="ฝากข้ามคืน"
                      value="true"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    วันที่ใช้บริการฝาก
                  </Col>
                  <Col xs="12" sm="4">
                    <Input
                      type="date"
                      name="service_start_time"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                  <Col xs="12" sm="4">
                    <Input
                      type="date"
                      name="service_end_time"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ประเภทอาหาร
                  </Col>
                  <Col xs="12" sm="4">
                    <ButtonDropdown
                      isOpen={dropdownTypeOpen}
                      toggle={toggleType}
                    >
                      <DropdownToggle caret size="sm">
                        {serviceInfo.service_meal_type === null
                          ? "เลือกประเภทอาหาร"
                          : serviceInfo.service_meal_type}
                      </DropdownToggle>
                      <DropdownMenu>{mealTypeElements}</DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ความถี่ในการให้อาหาร
                  </Col>
                  <Col xs="12" sm="4">
                    <ButtonDropdown
                      isOpen={dropdownFreqOpen}
                      toggle={toggleFreq}
                    >
                      <DropdownToggle caret size="sm">
                        {serviceInfo.service_meal_per_day === null
                          ? "เลือกความถี่ในการให้อาหาร"
                          : serviceInfo.service_meal_per_day + " ครั้ง/วัน"}
                      </DropdownToggle>
                      <DropdownMenu>{mealPerDayElements}</DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ปริมาณอาหารต่อวัน
                  </Col>
                  <Col xs="7" sm="4">
                    <Input
                      type="range"
                      id="weightRange"
                      name="service_meal_weight"
                      min="30"
                      max="200"
                      value={serviceInfo.service_meal_weight}
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                  <Col xs="5" sm="4">
                    {serviceInfo.service_meal_weight} กรัม/วัน
                  </Col>
                </Row>
              </FormGroup>
            </div>
            <FormGroup>
              <h4>บริการเพิ่มเติม</h4>
            </FormGroup>
            <div className="list-service">
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    พาสุนัขไปเดินเล่น
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="walkRadio"
                      name="service_is_walk"
                      value="true"
                      label="ต้องการ"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="walkRadio2"
                      name="service_is_walk"
                      value="false"
                      label="ไม่ต้องการ"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ให้ผู้รับฝากไปรับสุนัข
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="getDogRadio"
                      name="service_is_get_dog"
                      value="true"
                      label="ต้องการ"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="getDogRadio2"
                      name="service_is_get_dog"
                      value="false"
                      label="ไม่ต้องการ"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ให้ผู้รับฝากไปส่งสุนัข
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="sendDogRadio"
                      name="service_is_deliver_dog"
                      value="true"
                      label="ต้องการ"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="sendDogRadio2"
                      name="service_is_deliver_dog"
                      value="false"
                      label="ไม่ต้องการ"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    อาบน้ำสุนัข
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="bathDogRadio"
                      name="service_is_dog_bath"
                      value="true"
                      label="ต้องการ"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                  <Col xs="6" sm="4">
                    <CustomInput
                      type="radio"
                      id="bathDogRadio2"
                      name="service_is_dog_bath"
                      value="false"
                      label="ไม่ต้องการ"
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </div>
            <FormGroup>
              <Row>
                <h4>รายละเอียดเพิ่มเติมเพิ่มเติม</h4>
                <Input
                  rows="5"
                  type="textarea"
                  placeholder="ระบุรายละเอียดเพิ่มเติม"
                  name="service_bio"
                  value={serviceInfo.service_bio}
                  onChange={onServiceInfoChange}
                />
              </Row>
              <Row></Row>
            </FormGroup>
          </Form>
        </Col>
        <Col xs="12" sm="12" md="12" lg="4">
          <ServiceDetail serviceInfo={serviceInfo} />

          <Row>
            <Col align="right">
              <Button onClick={onServiceSubmit}>ยืนยัน</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
