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
      <Row>
        {/* ///////////////////////////////collumn ซ้าย//////////////////////////////////// */}
        <Col className="profilecolumn" style={{minwidth:"50vw"}}>
          <Card style={{ backgroundColor: "#ffbb3cd5" }}>
            <CardHeader>
              <FreeDay />
              <div style={{ textAlign: "center" }}>
                <img
                  src={process.env.PUBLIC_URL + "/doge.png"}
                  width="62.5"
                  height="84.5"
                />
                <br />
                <br />
                <h3>
                  <FontAwesomeIcon
                    icon={faBone}
                    className="mr-2 fa-rotate-135"
                    size="xs"
                  />
                  {host.hostName}
                </h3>
                <h5>มือใหม่หัดเลี้ยง</h5>
                <br />
              </div>
            </CardHeader>
            <CardBody
              style={{ textAlign: "center", backgroundColor: "#d0d0d0" }}
            >
              <CardTitle tag="h5"><div>รับฝากมาแล้ว x ตัว</div><div style={{wordWrap:"break-word"}}>รวม x ชั่วโมง</div></CardTitle>
              <br />
              <br />
              <CardText>
                <Container>
                  <Row>
                    <Col style={{ fontSize: "20px" }}>ขนาดบริเวณเลี้ยง<br/>xxx<br/>ตารางเมตร</Col><br/><br/>
                    <Col style={{ fontSize: "20px" }}>คะแนนรีวิว<br/>xxx/5.0<br/><FontAwesomeIcon icon={faBone} size="xs" /></Col>
                  </Row>
                </Container>
              </CardText>
            </CardBody>
            <a href="#" style={{ color: "black" }}>
              <CardFooter
                style={{ textAlign: "center", backgroundColor: "#ffbb3cd5" }}
              >
                รายละเอียดเพิ่มเติม
              </CardFooter>
            </a>
          </Card>
        </Col>

        {/* ///////////////////////////////collumn ขวา//////////////////////////////////// */}
        <Col style={{ padding: "0px" }}>
          <Container fluid="sm">
          <HostGallery />
          <article></article>
          </Container>
        </Col>
        </Row>
    </div>
  );
}
