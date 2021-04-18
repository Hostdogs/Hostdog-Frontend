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

export default function ServiceForm() {
  const [dropdownTypeOpen, setTypeOpen] = useState(false);
  const toggleType = () => setTypeOpen(!dropdownTypeOpen);

  const [dropdownFreqOpen, setFreqOpen] = useState(false);
  const toggleFreq = () => setFreqOpen(!dropdownFreqOpen);

  const [dropdownWeightOpen, setWeightOpen] = useState(false);
  const toggleWeight = () => setWeightOpen(!dropdownWeightOpen);

  const mealPerDays = [
    { label: "1 ครั้ง/วัน", value: 1 },
    { label: "2 ครั้ง/วัน", value: 2 },
    { label: "3 ครั้ง/วัน", value: 3 },
    { label: "4 ครั้ง/วัน", value: 4 },
    { label: "5 ครั้ง/วัน", value: 5 },
  ];

  const [serviceInfo, setServiceInfo] = useState({
    host: null,
    customer: null,
    dog: null,
    service_status: "",
    service_is_over_night: false,
    service_start_time: null,
    service_end_time: null,
    service_send_time: null,
    service_get_time: null,
    service_meal_type: null,
    service_meal_per_day: "เลือกความถี่ในการให้อาหาร",
    service_meal_weight: null,
    service_is_walk: false,
    service_is_get_dog: false,
    service_is_deliver_dog: false,
    service_is_dog_bath: false,
    service_bio: "",
    service_is_rating: false,
    service_rating: null,
  });

  function changeValue(data) {
    if (data === "true" || data === true) {
      return true;
    } else if (data === "false" || data === false) {
      return false;
    } else if (!isNaN(data)) {
      return Number(data);
    } else {
      return data;
    }
  }
  function onServiceInfoChange(event) {
    const { name, value } = event.target;
    setServiceInfo((prevServiceInfo) => {
      return {
        ...prevServiceInfo,
        [name]: changeValue(value),
      };
    });
  }

  useEffect(() => {
    console.log(serviceInfo);
  }, [serviceInfo]);

  const mealPerDayElements = mealPerDays.map((mealPerDay, index) => {
    return (
      <DropdownItem
        id={index}
        name="service_meal_per_day"
        value={mealPerDay.value}
        onClick={onServiceInfoChange}
      >
        {mealPerDay.label}
      </DropdownItem>
    );
  });

  return (
    <div>
      <Container>
        <Form>
          <FormGroup>
            <h4>เลือกบริการของคุณ</h4>
          </FormGroup>
          <div className="list-service">
            <FormGroup>
              <Row>
                <Col xs="6" sm="4">
                  เลือกสุนัขของคุณ
                </Col>
                <Col xs="6" sm="4">
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
                  <ButtonDropdown isOpen={dropdownTypeOpen} toggle={toggleType}>
                    <DropdownToggle caret size="sm">
                      เลือกประเภทอาหาร
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>อาหารเปียก</DropdownItem>
                      <DropdownItem>อาหารแห้ง</DropdownItem>
                    </DropdownMenu>
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
                  <ButtonDropdown isOpen={dropdownFreqOpen} toggle={toggleFreq}>
                    <DropdownToggle caret size="sm">
                      {serviceInfo.service_meal_per_day}
                      {serviceInfo.service_meal_per_day ===
                      "เลือกความถี่ในการให้อาหาร"
                        ? ""
                        : " ครั้ง/วัน"}
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
                <Col xs="12" sm="4">
                  <ButtonDropdown
                    isOpen={dropdownWeightOpen}
                    toggle={toggleWeight}
                  >
                    <DropdownToggle caret size="sm">
                      เลือกปริมาณอาหารต่อวัน
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>20 กรัม</DropdownItem>
                      <DropdownItem>30 กรัม</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
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
                  พาไปสุนัขเดินเล่น
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
      </Container>
    </div>
  );
}
