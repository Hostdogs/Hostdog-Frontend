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
import { useCookies } from "react-cookie";
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
  const [isGet, setisGet] = useState(false)

  useEffect(() => {
    if (host) {
      setHostName(host.first_name + " " + host.last_name);
      setServiceInfo({...serviceInfo,host:host.account})
    }
    if (hostService) {
      setMealTypes(hostService.available_meals);
      setisWalk(hostService.is_dog_walk);
      setisDeliver(hostService.is_delivery_dog);
      setisBath(hostService.is_bath_dog);
      setisGet(hostService.is_get_dog);

    }
    if(customerAccount){
 
      setCustomerDogs(customerAccount.customer.dog_customer)
      setServiceInfo({...serviceInfo,customer:customerAccount.id})
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
        console.log(customerDogs)
        console.log(customerDogs[i])
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
      <Card>
        <CardImg
          top
          width="100%"
          src={customerDog.picture}
        />
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
      });
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
                    {dogName ? (<Label>{dogName}</Label>) : (<Label disable>ยังไม่ได้เลือก</Label>)}
                    <Button color="primary" size="sm" onClick={toggle} >
                      เลือก
                    </Button>
                    <Modal isOpen={modal} fade={false} toggle={toggle}>
                      <ModalHeader toggle={toggle}>
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
                          onChange={onServiceInfoChange}
                        />
                      </Col>

                      <Col xs="12" sm="12" md="12">
                        ถึง:
                        <Input
                          type="datetime-local"
                          name="service_end_time"
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
                      <DropdownToggle caret size="sm">
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
            <FormGroup>
              <h4>บริการเพิ่มเติม</h4>
            </FormGroup>
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
                        onChange={onServiceInfoChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              ) : null}
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
          <ServiceDetail
            serviceInfo={serviceInfo}
            customerMealLabel={customerMealLabel}
            listDogFeedingTime={listDogFeedingTime}
            mealPrice={mealPrice}
            hostService={hostService}
          />

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
