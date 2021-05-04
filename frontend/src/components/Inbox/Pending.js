import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Row,
  List,
  Spinner,
} from "reactstrap";
import "./Pending.css";
import { useCookies } from "react-cookie";
import ServiceAPI from "../API/ServiceAPI";
import moment from "moment";
export default function Pending({ service, pendingData, setpendingData }) {
  const [customerName, setcustomerName] = useState();
  // const [hostName, sethostName] = useState()
  const [dog, setdog] = useState(null);
  const [hostService, sethostService] = useState();
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const [dogAge, setdogAge] = useState();
  const [regDate, setregDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [meal, setmeal] = useState();
  const [mealTime, setmealTime] = useState();
  const [serviceDescription, setserviceDescription] = useState();
  const [Price, setPrice] = useState();
  const [serviceDetails, setServiceDetails] = useState([]);
  const [isNotAllEtc, setNotIsAllEtc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (service) {
      setcustomerName(
        service.customer.first_name + " " + service.customer.last_name
      );
      // sethostName(service.host.first_name + " " + service.host.last_name)

      setdog(service.dog);

      let age = getAgemonth(service.dog.dog_dob);

      setdogAge(age);
      setregDate(moment(service.service_reg_time).format("ll"));
      setendDate(moment(service.service_end_time).format("ll"));
      setmeal(service.service_meal_type.meal_type);
      setmealTime(service.dog.dog_feeding_time);
      setserviceDescription(service.service_bio);
      setPrice(service.total_price);
      console.log(service);
      if (
        service.is_bath_dog === false &&
        service.is_delivery_dog === false &&
        service.is_dog_walk === false &&
        service.is_get_dog === false
      ) {
        setNotIsAllEtc(true);
      }
    }
  }, [service]);

  const getAgemonth = (inputdob) => {
    let now = moment();
    let dob = moment(inputdob, "YYYY-MM-DD");
    let year = now.diff(dob, "years");
    dob.add(year, "years");
    let month = now.diff(dob, "months");
    if (year !== 0 && month !== 0) {
      return year + " ปี " + month + " เดือน";
    }
    if (year == 0) {
      return month + " เดือน";
    }
  };

  const handleHostAccept = () => {
    setIsLoading(true);
    ServiceAPI.responseService(cookies.mytoken, service.id, { accept: true })
      .then((response) => {
        const new_pending = pendingData.filter((pen) => {
          return pen.id !== service.id;
        });
        setIsLoading(false);
        setpendingData(new_pending);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error");
        console.log(error);
      });
  };
  const handleHostDecline = () => {
    setIsLoading(true);
    ServiceAPI.responseService(cookies.mytoken, service.id, { accept: false })
      .then((response) => {
        const new_pending = pendingData.filter((pen) => {
          return pen.id !== service.id;
        });
        setIsLoading(false);
        setpendingData(new_pending);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error");
        console.log(error);
      });
  };

  return (
    <div className="PendingBox">
      <Container>
        <Card className="PendingBox2">
          <CardHeader className="forUnskew">
            <h3 className="heading3">
              คำขอบริการ: <small>{customerName}</small>{" "}
            </h3>
          </CardHeader>
          <CardBody>
            <Label>
              <h5>
                ระยะเวลาบริการ {regDate} ถึง {endDate}
              </h5>{" "}
            </Label>
            <Row>
              <Col md="4" xs="6" sm="5" style={{ alignItems: "center" }}>
                <img
                  src={dog ? dog.picture : null}
                  class="img-responsive center-block"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    marginBottom: "15px",
                  }}
                />
              </Col>
              <Col>
                <Label>
                  <h4>รายละเอียดสุนัข</h4>
                </Label>
                <br />
                <Label>สุนัข: {dog ? dog.dog_name : ""}</Label>
                <br />
                <Label>สายพันธุ์: {dog ? dog.dog_breed : ""}</Label>
                <br />
                <Label>อายุ: {dogAge ? dogAge : ""}</Label>
                <br />
                <Label>
                  ประเภทอาหาร: {meal}
                  <br />
                </Label>
                <br />
                <Label>
                  เวลาให้อาหาร:
                  {mealTime ? (
                    <div>
                      {mealTime.map((item) => (
                        <span key={item.id} style={{ paddingRight: "10px" }}>
                          {item.time.slice(0, 5)}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Label>
                <br />
              </Col>
              <Col>
                <List type="unstyled">
                  <li>
                    <h4>รายละเอียดบริการ</h4>
                  </li>
                  <li style={{ marginLeft: "10px" }}>
                    <h5>บริการทั่วไป</h5>
                  </li>
                  <ul>
                    <li>
                      เริ่มบริการ :{" "}
                      {moment
                        .tz(service.service_start_time, "Asia/Bangkok")
                        .format("DD MMM YYYY, เวลา : HH:mm")}
                    </li>

                    <li>
                      สิ้นสุดบริการ :{" "}
                      {moment
                        .tz(service.service_end_time, "Asia/Bangkok")
                        .format("DD MMM YYYY, เวลา : HH:mm")}
                    </li>

                    <li>ประเภทอาหาร : {service.service_meal_type.meal_type}</li>

                    <li>
                      ปริมาณอาหาร : {service.service_meal_weight} กรัม/มื้อ
                    </li>
                  </ul>
                </List>
                {isNotAllEtc ? null : (
                  <List type="unstyled">
                    <li style={{ marginLeft: "10px" }}>
                      <h5>บริการเพิ่มเติม</h5>
                    </li>
                    <ul>
                      {service.is_dog_walk ? <li>พาสุนัขไปเดินเล่น</li> : null}
                      {service.is_bath_dog ? <li>อาบน้ำสุนัข</li> : null}
                      {service.is_get_dog ? (
                        <li>ให้ผู้รับฝากไปรับสุนัข</li>
                      ) : null}
                      {service.is_delivery_dog ? (
                        <li>ให้ผู้รับฝากไปส่งสุนัข</li>
                      ) : null}
                    </ul>
                  </List>
                )}
              </Col>
            </Row>
            <Label>
              <h4>รายละเอียดเพิ่มเติม</h4>
            </Label>
            <br />
            <p style={{ wordWrap: "break-word" }}>{serviceDescription}</p>
            <br />
            <Label>
              <h4>ค่าบริการ</h4>
            </Label>
            <br />
            {Price ? <Label>{Price} บาท</Label> : null}
            {/* <ul>
              <div className="InDesktop">

                <div>
                  สุนัข: {dog.dog_name||<Skeleton/>}
                </div>
                <div>รายละเอียดการบริการ:</div>
                <div>บริการที่เพิ่มเติม:</div>
              </div>
            </ul>

            <div className="InMobile">
              <div>{customerName}</div>
              <div>สุนัข:</div>
              <div>รายละเอียดการบริการ:</div>
              <div>บริการที่เพิ่มเติม:</div>
            </div> */}
            <br />
            <Button
              style={{
                color: "black",
                border: "none",
                position: "absolute",
                bottom: "10px",
                right: "85px",
              }}
              color="warning"
              onClick={handleHostAccept}
            >
              ยืนยัน
            </Button>
            <Button
              onClick={handleHostDecline}
              style={{
                marginLeft: "10px",
                border: "none",
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: "#ff0000",
              }}
            >
              ปฏิเสธ
            </Button>
          </CardBody>

          {/* </Container> */}
          {isLoading ? <div className="loading"></div> : null}
        </Card>
      </Container>
      <br />
    </div>
  );
}
