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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import "./Service.css";
import ServiceDetail from "./ServiceDetail";
import HostAPI from "../API/HostAPI";
import MealAPI from "../API/MealAPI";
import DogAPI from "../API/DogAPI";
import HostServiceAPI from "../API/HostServiceAPI";
import ServiceAPI from "../API/ServiceAPI";
import HostAvailableDateAPI from "../API/HostAvailableDateAPI";
import { useCookies } from "react-cookie";
import AlertModal from "../ProgressPage/AlertModal";
import moment from "moment-timezone";
export default function ServiceForm({ host, customerAccount, hostService }) {
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [dropdownTypeOpen, setTypeOpen] = useState(false);
  const toggleType = () => setTypeOpen(!dropdownTypeOpen);

  const [dropdownFreqOpen, setFreqOpen] = useState(false);
  const toggleFreq = () => setFreqOpen(!dropdownFreqOpen);
  const [hostName, setHostName] = useState("");

  const [mealTypes, setMealTypes] = useState([]);

  const [customerMealLabel, setCustomerMealLabel] = useState(
    "เลือกประเภทอาหาร"
  );
  const [mealPrice, setMealPrice] = useState(0);

  const [customerDogs, setCustomerDogs] = useState([]);
  const [listDogFeedingTime, setListDogFeedingTime] = useState([]);

  const [dogName, setDogName] = useState(null);
  const [isWalk, setisWalk] = useState(false);
  const [isDeliver, setisDeliver] = useState(false);
  const [isBath, setisBath] = useState(false);
  const [isGet, setisGet] = useState(false);

  const [availableDates, setAvailableDates] = useState([]);
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DDTHH:mm")
  );
  let twoMonthsLater = new Date();
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
  const [endDate, setEndDate] = useState(
    moment(twoMonthsLater).format("YYYY-MM-DDT23:59")
  );

  useEffect(() => {
    if (host) {
      HostAvailableDateAPI.GetHostAvailableDate(
        cookies["mytoken"],
        host.account
      ).then((resp) => {
        const sortDate = resp.data.sort(function (a, b) {
          return a.date.localeCompare(b.date);
        });
        setAvailableDates(sortDate);
        setStartDate(sortDate[0].date + "T00:00");
        setEndDate(sortDate[sortDate.length - 1].date + "T00:00");
        //console.log(sortDate[0].date + "T:00:00");
      });
    }
  }, [host]);

  useEffect(() => {
    if (host) {
      setHostName(host.first_name + " " + host.last_name);
      setServiceInfo({ ...serviceInfo, host: host.account });
    }
    if (hostService) {
      setMealTypes(hostService.available_meals);
      setisWalk(hostService.enable_dog_walk);
      setisDeliver(hostService.enable_delivery_dog);
      setisBath(hostService.enable_bath_dog);
      setisGet(hostService.enable_get_dog);
    }
    if (customerAccount) {
      setCustomerDogs(customerAccount.customer.dog_customer);
      setServiceInfo({ ...serviceInfo, customer: customerAccount.id });
    }
  }, [host, customerAccount, hostService]);

  const getDogFeedingTime = async () => {
    const response = await DogAPI.GetFeedingTime(
      cookies["mytoken"],
      cookies["user_id"],
      serviceInfo.dog
    );

    const dogFeedingTime = response.data;
    console.log(dogFeedingTime);
    setListDogFeedingTime(dogFeedingTime);
  };
  const getMealPrice = async () => {
    const response = await MealAPI.getMeal(
      cookies.mytoken,
      serviceInfo.service_meal_type
    );
    const meal = response.data;
    setMealPrice(meal.meal_price_per_gram);
  };
  const [serviceInfo, setServiceInfo] = useState({
    host: null,
    customer: null,
    dog: null,
    service_start_time: null,
    service_end_time: null,
    service_meal_type: null,
    service_meal_weight: 20,
    is_dog_walk: false,
    is_get_dog: false,
    is_delivery_dog: false,
    is_bath_dog: false,
    service_bio: "",
  });

  function changeValue(name, value) {
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false) {
      return false;
    } else if (!isNaN(value) && name !== "service_bio" && value !== "") {
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

    if (name === "service_meal_type") {
      for (var i = 0; i < mealTypes.length; i++) {
        if (parseInt(value) === mealTypes[i].id) {
          setCustomerMealLabel(mealTypes[i].meal_type);
        }
      }
    }
    if (name === "dog") {
      for (var i = 0; i < customerDogs.length; i++) {
        console.log(customerDogs);
        console.log(customerDogs[i]);
        if (parseInt(value) === customerDogs[i].id) {
          setDogName(customerDogs[i].dog_name);
        }
      }
    }
  }

  useEffect(() => {
    getDogFeedingTime();
    getMealPrice();
  }, [serviceInfo.dog, serviceInfo.service_meal_type]);

  // useEffect(() => {
  //   console.log("serviceInfo");
  //   console.log(serviceInfo);
  // }, [serviceInfo]);

  const customerDogElements = customerDogs.map((customerDog) => {
    let gender = "";
    if (customerDog.gender === "Male") {
      gender = "เพศ : ผู้";
    } else if (customerDog.gender === "Female") {
      gender = "เพศ : เมีย";
    }

    return (
      <Card style={{borderRadius:"0"}}>
        <CardImg style={{objectFit:"contain",width:"100%",height:"200px", textAlign:"center"}} src={customerDog.picture} />
        <CardBody>
          <CardTitle tag="h5"> {customerDog.dog_name}</CardTitle>
          <CardText>
            สายพันธุ์ : {customerDog.dog_breed} , {gender} , วันเกิด :{" "}
            {customerDog.dog_dob} , น้ำหนัก : {customerDog.dog_weight} กิโลกรัม
          </CardText>
          <Button
            key={customerDog.id}
            name="dog"
            value={customerDog.id}
            onClick={(customerDog) => {
              onServiceInfoChange(customerDog);
              toggle();
            }}
            style={{backgroundColor:"#43978d", border:"0px"}}
          >
            เลือก
          </Button>
        </CardBody>
      </Card>
    );
  });

  const mealTypeElements = mealTypes.map((mealType, index) => {
    return (
      <DropdownItem
        key={mealType.id}
        name="service_meal_type"
        value={mealType.id}
        className={mealType.meal_type}
        onClick={onServiceInfoChange}
      >
        {mealType.meal_type}
      </DropdownItem>
    );
  });

  function onServiceSubmit(event) {
    event.preventDefault();
    console.log("serviceInfo");
    console.log(serviceInfo);

    ServiceAPI.createService(cookies.mytoken, serviceInfo)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
        toggleError();
      });
  }
  const [modalSubmit, setModalSubmit] = useState(false);

  const toggleSubmit = () => setModalSubmit(!modalSubmit);

  const [modalError, setModalError] = useState(false);

  const toggleError = () => setModalError(!modalError);

  return (
    <div>
      <Row>
        <Col
          xs="12"
          sm="12"
          md="12"
          lg="8"
          style={{ backgroundColor: "#fef7ef" }}
        >
          <Form>
            <FormGroup style={{ paddingTop: "20px" }}>
              <h4>เลือกบริการของคุณ</h4>
            </FormGroup>
            <div className="list-service">
              <FormGroup>
                <Row>
                  <Col xs="7" sm="4">
                    เลือกสุนัขของคุณ
                  </Col>
                  <Col xs="5" sm="4">
                    {dogName ? (
                      <Label>{dogName}</Label>
                    ) : (
                      <Label disable>ยังไม่ได้เลือก</Label>
                    )}
                    {" "}
                    <Button size="sm" onClick={toggle} style={{backgroundColor:"#43978d",color:"white",fontSize:"14px"}}>
                      เลือก
                    </Button>
                    <Modal isOpen={modal} fade={false} toggle={toggle}>
                      <ModalHeader toggle={toggle} style={{backgroundColor:"#f9e07f"}}>
                        เลือกสุนัขของคุณ
                      </ModalHeader>
                      <ModalBody>{customerDogElements}</ModalBody>
                    </Modal>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ผู้รับฝาก
                  </Col>
                  <Col xs="12" sm="6">
                    {hostName}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    วันที่ใช้บริการฝาก
                  </Col>
                  <Col sm="6" xs="12">
                    <Row>
                      <Col xs="12" sm="12" md="12">
                        เริ่ม:
                        <Input
                          type="datetime-local"
                          name="service_start_time"
                          min={startDate}
                          max={endDate}
                          onChange={onServiceInfoChange}
                        />
                      </Col>
                      <Col xs="12" sm="12" md="12">
                        ถึง:
                        <Input
                          type="datetime-local"
                          name="service_end_time"
                          min={serviceInfo.service_start_time}
                          max={endDate}
                          onChange={onServiceInfoChange}
                        />
                      </Col>
                    </Row>
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
                      <DropdownToggle caret size="sm" style={{backgroundColor:"#43978d",color:"white", fontSize:"14px"}}>
                        {customerMealLabel}
                      </DropdownToggle>
                      <DropdownMenu>{mealTypeElements}</DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col xs="12" sm="4">
                    ปริมาณอาหารต่อมื้อ
                  </Col>
                  <Col xs="7" sm="4">
                    <Input
                      type="range"
                      id="weightRange"
                      name="service_meal_weight"
                      min="10"
                      max="100"
                      value={serviceInfo.service_meal_weight}
                      onChange={onServiceInfoChange}
                    />
                  </Col>
                  <Col xs="5" sm="4">
                    {serviceInfo.service_meal_weight} กรัม/มื้อ
                  </Col>
                </Row>
              </FormGroup>
            </div>
            {isWalk || isGet || isDeliver || isBath ? (
              <FormGroup>
                <h4>บริการเพิ่มเติม</h4>
              </FormGroup>
            ) : null}
            <div className="list-service">
              {isWalk ? (
                <FormGroup>
                  <Row>
                    <Col xs="12" sm="4">
                      พาสุนัขไปเดินเล่น
                    </Col>
                    <Col xs="6" sm="4">
                      <CustomInput
                        type="radio"
                        id="walkRadio"
                        name="is_dog_walk"
                        value="true"
                        label="ต้องการ"
                        checked={serviceInfo.is_dog_walk}
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                    <Col xs="6" sm="4">
                      <CustomInput
                        type="radio"
                        id="walkRadio2"
                        name="is_dog_walk"
                        value="false"
                        label="ไม่ต้องการ"
                        checked={!serviceInfo.is_dog_walk}
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              ) : null}
              {isGet ? (
                <FormGroup>
                  <Row>
                    <Col xs="12" sm="4">
                      ให้ผู้รับฝากไปรับสุนัข
                    </Col>
                    <Col xs="6" sm="4">
                      <CustomInput
                        type="radio"
                        id="getDogRadio"
                        name="is_get_dog"
                        value="true"
                        label="ต้องการ"
                        checked={serviceInfo.is_get_dog}
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                    <Col xs="6" sm="4">
                      <CustomInput
                        type="radio"
                        id="getDogRadio2"
                        name="is_get_dog"
                        value="false"
                        label="ไม่ต้องการ"
                        checked={!serviceInfo.is_get_dog}
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              ) : null}
              {isDeliver ? (
                <FormGroup>
                  <Row>
                    <Col xs="12" sm="4">
                      ให้ผู้รับฝากไปส่งสุนัข
                    </Col>
                    <Col xs="6" sm="4">
                      <CustomInput
                        type="radio"
                        id="sendDogRadio"
                        name="is_delivery_dog"
                        value="true"
                        label="ต้องการ"
                        checked={serviceInfo.is_delivery_dog}
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                    <Col xs="6" sm="4">
                      <CustomInput
                        type="radio"
                        id="sendDogRadio2"
                        name="is_delivery_dog"
                        value="false"
                        label="ไม่ต้องการ"
                        checked={!serviceInfo.is_delivery_dog}
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              ) : null}
              {isBath ? (
                <FormGroup>
                  <Row>
                    <Col xs="12" sm="4">
                      อาบน้ำสุนัข
                    </Col>
                    <Col xs="6" sm="4">
                      <CustomInput
                        type="radio"
                        id="bathDogRadio"
                        name="is_bath_dog"
                        value="true"
                        label="ต้องการ"
                        checked={serviceInfo.is_bath_dog}
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                    <Col xs="6" sm="4">
                      <CustomInput
                        type="radio"
                        id="bathDogRadio2"
                        name="is_bath_dog"
                        value="false"
                        label="ไม่ต้องการ"
                        checked={!serviceInfo.is_bath_dog}
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              ) : null}
            </div>
            <FormGroup>
              <div>
                <h4>รายละเอียดเพิ่มเติม</h4>
                <div style={{paddingLeft:"25px",paddingRight:"25px"}}>
                  <Input
                    rows="5"
                    type="textarea"
                    placeholder="ระบุรายละเอียดเพิ่มเติม"
                    name="service_bio"
                    value={serviceInfo.service_bio}
                    onChange={onServiceInfoChange}
                  />
                </div>
              </div>
            </FormGroup>
          </Form>
        </Col>
        <Col
          xs="12"
          sm="12"
          md="12"
          lg="4"
          style={{ paddingTop: "20px", paddingLeft: "50px" }}
        >
          <ServiceDetail
            serviceInfo={serviceInfo}
            customerMealLabel={customerMealLabel}
            listDogFeedingTime={listDogFeedingTime}
            mealPrice={mealPrice}
            hostService={hostService}
          />

          <Row>
            <AlertModal
              message={"ไม่สามารถสร้างบริการได้ ลองใหม่อีกครั้ง"}
              alertModal={modalError}
              alertToggle={toggleError}
            />
            <Col align="right">
              <Button onClick={toggleSubmit} style={{backgroundColor:"#264d59"}}>ยืนยัน</Button>
              <Modal isOpen={modalSubmit} toggle={toggleSubmit}>
                <ModalHeader>
                  คุณต้องการยืนยันการสร้างบริการใช่หรือไม่
                </ModalHeader>
                <ModalFooter>
                  <Button
                    onClick={(e) => {
                      onServiceSubmit(e);
                      toggleSubmit();
                    }}
                    style={{backgroundColor:"#264d59"}}
                  >
                    ยืนยัน
                  </Button>{" "}
                  <Button color="danger" onClick={toggleSubmit}>
                    ยกเลิก
                  </Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
