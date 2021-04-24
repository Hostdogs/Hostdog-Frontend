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
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";
import HostGallery from "./HostGallery";
import "./Host.css";
import FreeDay from "./FreeDay";
import "holderjs";

export default function Host({ host }) {
  return (
    // <Card
    //   body
    //   outline
    //   color="warning"
    //   className="host"
    //   style={{
    //     background: "#fff3d0",
    //     height: "60vh",
    //     margin:"5px 0px",
    //   }}
    // >
    //   <CardTitle tag="h5">
    //     {" "}
    //     {host.hostName}
    //     {"     "}
    //     {host.distancefromCus}
    //   </CardTitle>

    //   <CardText> วันว่าง:{host.dateAvail}</CardText>
    // </Card>
    <div className="borderCard">
      <Card style={{ backgroundColor: "#ffbb3cd5" }}>
        <CardHeader>
          <Row>
            <Col xs="12" sm="12" md="2" lg="2" style={{ textAlign: "center" }}>
              <FreeDay />
              <img
                src="holder.js/125x125"
                class="img-responsive center-block"
                style={{
                  borderRadius: "50%",
                  width: "125px",
                  height: "100%",
                }}
              />
            </Col>
            <Col xs="12" sm="12" md="10" lg="10">
              <Row>
                <Col
                  xs="12"
                  sm="12"
                  md="12"
                  lg="5"
                  style={{ textAlign: "center" }}
                >
                  <h3>
                    <FontAwesomeIcon
                      icon={faBone}
                      className="mr-2 fa-rotate-135"
                      size="xs"
                    />
                    {host.hostName}
                  </h3>
                  <h5>มือใหม่หัดเลี้ยง</h5>
                </Col>
                <Col xs="12" sm="12" md="12" lg="7">
                  <Row style={{ justifyContent: "center" }}>
                    <Col xs="12" md="6" lg="8" style={{ fontSize: "20px" }}>
                      <div>รับฝากมาแล้ว x ตัว</div>
                      <div style={{ wordWrap: "break-word" }}>
                        รวม x ชั่วโมง
                      </div>
                      <div>ขนาดบริเวณเลี้ยง xxx ตารางเมตร</div>
                    </Col>
                    <Col xs="12" md="3" lg="4" style={{ fontSize: "20px" }}>
                      คะแนนรีวิว
                      <br />
                      xxx/5.0
                      <br />
                      <FontAwesomeIcon icon={faBone} size="xs" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Col style={{ padding: "0px" }}>
            <Container fluid="sm">
              <HostGallery />
              <article></article>
            </Container>
          </Col>
        </CardBody>
        <a href="#" style={{ color: "black" }}>
          <CardFooter
            style={{ textAlign: "center", backgroundColor: "#ffbb3cd5" }}
          >
            รายละเอียดเพิ่มเติม
          </CardFooter>
        </a>
      </Card>

      {/* ///////////////////////////////collumn ขวา//////////////////////////////////// */}
    </div>
  );
}
