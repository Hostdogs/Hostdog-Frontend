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
            <Col>
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

            <Col>
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
            <Col>
              <Container>
                <div>รับฝากมาแล้ว x ตัว</div>
                <div style={{ wordWrap: "break-word" }}>รวม x ชั่วโมง</div>
                <Row>
                  <Col style={{ fontSize: "20px" }}>
                    ขนาดบริเวณเลี้ยง
                    <br />
                    xxx
                    <br />
                    ตารางเมตร
                  </Col>
                  <br />
                  <br />
                  <Col style={{ fontSize: "20px" }}>
                    คะแนนรีวิว
                    <br />
                    xxx/5.0
                    <br />
                    <FontAwesomeIcon icon={faBone} size="xs" />
                  </Col>
                </Row>
              </Container>
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
