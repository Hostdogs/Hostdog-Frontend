import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Button, Card, CardBody, CardHeader, Col, Container, Label, Row } from "reactstrap";
import "./Pending.css";
import { useCookies } from 'react-cookie'
import ServiceAPI from '../API/ServiceAPI'
import moment from "moment";
export default function Pending({ service }) {
  const [customerName, setcustomerName] = useState()
  // const [hostName, sethostName] = useState()
  const [dog, setdog] = useState(null)
  const [hostService, sethostService] = useState()
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"])
  const [dogAge, setdogAge] = useState()
  const [regDate, setregDate] = useState("")
  const [endDate, setendDate] = useState("")
  const [meal, setmeal] = useState()
  const [mealTime, setmealTime] = useState()
  const [serviceDescription, setserviceDescription] = useState()
  const [Price, setPrice] = useState()
  useEffect(() => {
    if (service) {
      setcustomerName(service.customer.first_name + " " + service.customer.last_name)
      // sethostName(service.host.first_name + " " + service.host.last_name)

      setdog(service.dog)

      let age = getAgemonth(service.dog.dog_dob)

      setdogAge(age)
      setregDate(moment(service.service_reg_time).format("ll"))
      setendDate(moment(service.service_end_time).format("ll"))
      setmeal(service.service_meal_type.meal_type)
      setmealTime(service.dog.dog_feeding_time)
      setserviceDescription(service.service_bio)
      setPrice(service.total_price)
      console.log(service)
    }
  }, [service])


  const getAgemonth = (inputdob) => {
    let now = moment()
    let dob = moment(inputdob, "YYYY-MM-DD")
    let year = now.diff(dob, "years")
    dob.add(year, "years")
    let month = now.diff(dob, "months")
    if (year !== 0 && month !== 0) {
      return year + " ปี " + month + " เดือน"
    }
    if (year == 0) {
      return month + " เดือน"
    }

  }

  const handleHostAccept = () => {

    ServiceAPI.responseService(cookies.mytoken, service.id, { accept: true }).then((response) => {
      console.log("handleHostAccept");
      console.log(response);
    }).catch((error) => {
      console.log("error");
      console.log(error);
    })
  }
  const handleHostDecline = () => {

    ServiceAPI.responseService(cookies.mytoken, service.id, { accept: false }).then((response) => {
      console.log("handleHostAccept");
      console.log(response);
    }).catch((error) => {
      console.log("error");
      console.log(error);
    })
  }

  return (
    <div className="PendingBox">
      <Container>


        <Card className="PendingBox2">


          <CardHeader className="forUnskew">
            <h3 className="heading3">คำขอบริการ: <small>{customerName}</small> </h3>


          </CardHeader>
          <CardBody>
            <Label><h5>ระยะเวลาบริการ {regDate} ถึง {endDate}</h5> </Label>
            <Row>
              <Col md="4" xs="6" sm="5" style={{ alignItems: "center" }}>
                <img
                  src={dog ? (dog.picture) : (null)}
                  class="img-responsive center-block"
                  style={{

                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col>
                <Label><h4>รายละเอียดสุนัข</h4></Label><br />
                <Label>
                  สุนัข: {dog ? (dog.dog_name) : ("")}
                </Label>
                <br />
                <Label>
                  สายพันธุ์: {dog ? (dog.dog_breed) : ("")}
                </Label>
                <br />
                <Label>
                  อายุ: {dogAge ? (dogAge) : ("")}
                </Label>
                <br />
                <Label>
                  ประเภทอาหาร: {meal}<br />

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
                  ) : (null)}

                </Label><br />




              </Col>
              <Col>
                <Label><h4>รายละเอียดบริการ</h4></Label><br />
              </Col>

            </Row>
            <Label><h4>รายละเอียดเพิ่มเติม</h4></Label><br />
            <p style={{ wordWrap: "break-word" }}>{serviceDescription}</p><br />
            <Label><h4>ค่าบริการ</h4></Label><br />
            {Price ? (<Label>{Price} บาท</Label>) : (null)}
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
                position: "absolute", bottom: "10px", right: "85px",
              }}
              color="warning"
              onClick={handleHostAccept}

            >
              ยืนยัน
            </Button>
            <Button onClick={handleHostDecline} style={{
              marginLeft: "10px", border: "none", position: "absolute", bottom: "10px", right: "10px",
              backgroundColor: "#ff0000"
            }} >
              ปฏิเสธ
            </Button>
          </CardBody>

          {/* </Container> */}
        </Card>
      </Container>
      <br />
    </div>
  );
}
