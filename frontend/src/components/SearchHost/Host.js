import {
  Card,
  Button,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  CardFooter,
  CardLink,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import HostGallery from "./HostGallery";
import "./Host.css";
import FreeDay from "./AvailableHost";
import "holderjs";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HostAPI from "../API/HostAPI";

export default function Host({ host }) {
  const [distance, setdistance] = useState("")
  const [urllink, seturllink] = useState("/")
  const [title, settitle] = useState("ผู้ฝากสุนัข")
  const [rating, setrating] = useState(0)
  const [hostInfo, sethostInfo] = useState({})
  useEffect(() => {
    if (host.distance < 1) {
      setdistance(Math.round(host.distance * 1000) + " m")
    } else {
      setdistance(Math.round(host.distance) + " km")
    }
    seturllink(`/profile/${host.account}`)
    setHostTitle(host.host_hosted_count)
    setrating(host.host_rating.toFixed(1))
    // console.log(host)
    sethostInfo(host)
  }, [host])
  let history = useHistory()
  const titleList = ["มือใหม่หัดเลี้ยง", "พี่เลี้ยงทั่วไป", "พี่เลี้ยงอาวุโส", "พี่เลี้ยงขั้นเซียน"]
  const setHostTitle = (value) => {
    if (value < 5) {
      settitle(titleList[0])
    } else if (value < 20) {
      settitle(titleList[1])
    } else if (value < 50) {
      settitle(titleList[2])
    } else {
      settitle(titleList[3])
    }
  }
  const placeholderPath = "user_placeholder.svg"


  return (

    <div>
      <Card>
        <CardHeader style={{ backgroundColor: "#f9e07f", borderRadius: "0", color: "#264d59" }}>
          <h4 style={{ position: "absolute", top: "5px", right: "10px" }}>{distance}</h4>
          <div style={{ position: "absolute", top: "7px", left: "15px" }}>
            <FreeDay host={host} />
          </div>
          <Row style={{ marginTop: "2%" }}>
            <Col xs="12" sm="12" md="2" lg="2" style={{ textAlign: "center" }}>
              <img
                src={hostInfo.picture || placeholderPath}
                className="img-responsive center-block"
                style={{
                  borderRadius: "50%",
                  width: "125px",
                  height: "125px",
                  objectFit: "cover"
                }}
              />
            </Col>
            <Col
              xs="12"
              sm="12"
              md="10"
              lg="10"
              style={{ paddingTop: "2%", textAlign: "center" }}
            >
              <Row>
                <Col
                  xs="12"
                  sm="12"
                  md="12"
                  lg="5"
                  style={{ textAlign: "center" }}
                >
                  <a className="mobile-br2">
                    <div style={{ paddingTop: "3%" }}> </div>
                  </a>
                  <h3 className="fontsizeName">
                    <FontAwesomeIcon
                      icon={faBone}
                      className="mr-2 fa-rotate-135"
                      size="xs"
                      style={{ transform: "rotate(135deg)", color: "#43978d" }}
                    />
                    {hostInfo.first_name} {hostInfo.last_name}
                  </h3>
                  <h5 className="fontsizeLevel">{title}</h5>
                </Col>
                <Col xs="12" sm="12" md="12" lg="7">
                  <Row style={{ justifyContent: "center" }}>
                    <Col xs="12" md="6" lg="8" style={{ fontSize: "18px" }} className="fontsizeDetail">
                      <a className="mobile-br2">
                        <div style={{ paddingTop: "3%" }}> </div>
                      </a>
                      <div>
                        รับเลี้ยงสุนัขมาแล้ว <b>{hostInfo.host_hosted_count} ตัว</b>{" "}
                        <a className="mobile-br">
                          <br />
                        </a>
                      </div>
                      <div>
                        ขนาดบริเวณพื้นที่เลี้ยง{" "}
                        <a className="mobile-br">
                          <br />
                        </a>
                        <b>{hostInfo.host_area} ตารางเมตร</b>
                      </div>
                      <a className="mobile-br2">
                        <br />
                      </a>
                    </Col>
                    <Col xs="12" md="3" lg="4" style={{ fontSize: "18px" }} className="fontsizeDetail">
                      <a style={{ fontSize: "20px", color: "#264d59", fontWeight: "bold", backgroundColor: "white", borderRadius: "50%", paddingLeft: "10px", paddingRight: "10px" }}>คะแนนรีวิว</a>

                      <br />
                      <FontAwesomeIcon icon={faBone} size="xs" style={{ transform: "rotate(135deg)", color: "#43978d" }} />
                      <b> {rating}/5.0</b>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardHeader>
        {host.house_image.length > 0 ? (
          <CardBody style={{ backgroundColor: "#f3f4f5" }}>
            <Col style={{ padding: "0px" }}>
              <Container fluid="sm">
                <HostGallery host={host} />
              </Container>
            </Col>
          </CardBody>
        ) : (null)}


        <CardBody
          style={{ textAlign: "center", backgroundColor: "#f9e07f", color: "#264d59" }}
        >
          <CardLink href="#" style={{ color: "#264d59" }} onClick={e => {
            history.push(urllink)
            history.go(0)
            e.preventDefault()
          }}

          >
            รายละเอียดเพิ่มเติม <FontAwesomeIcon icon={faChevronRight}/><FontAwesomeIcon icon={faChevronRight}/>
            </CardLink>
        </CardBody>

      </Card>
    </div>
  );
}
