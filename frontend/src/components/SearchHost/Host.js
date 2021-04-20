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
import { faBone, faImage } from "@fortawesome/free-solid-svg-icons";
import HostGallery from './HostGallery'
import './Host.css'
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
    <>
      <Row style={{justifyContent:"center"}}>
        <Col style={{padding:"0px"}}>
          <HostGallery />
          <article>

          </article>
        </Col>
        <Col className="profilecolumn" >
          <Card >
            <CardHeader style={{ backgroundColor: "#ffbb3cd5" }}>
              <div style={{ color: "black" }}>
                จ อ พ พฤ ศ ส อา
          </div>
              <div style={{ textAlign: "center" }}>
                <img
                  src={process.env.PUBLIC_URL + "/doge.png"}
                  width="62.5"
                  height="84.5"
                />
                <br /><br />
                <h3>
                  <FontAwesomeIcon
                    icon={faBone}
                    className="mr-2 fa-rotate-135"
                    size="xs"
                  />
              {host.hostName}
            </h3>
                <h5>มือใหม่หัดเลี้ยง</h5><br />
              </div>
            </CardHeader>
            <CardBody style={{ textAlign: "center", backgroundColor: "#d0d0d0" }}>
              <CardTitle tag="h5">รับฝากมาแล้ว x ตัว รวม x ชั่วโมง</CardTitle><br /><br />
              <CardText>
                <Container>
                  <Row>
                    <Col style={{ fontSize: "20px" }}>ขนาดบริเวณเลี้ยง</Col>
                    <Col style={{ fontSize: "20px" }}>คะแนนรีวิว</Col>
                  </Row>
                  <Row>
                    <Col>xxx</Col>
                    <Col>xxx/5.0</Col>
                  </Row>
                  <Row>
                    <Col>ตารางเมตร</Col>
                    <Col>
                      <FontAwesomeIcon
                        icon={faBone}
                        size="xs"
                      />
                    </Col>
                  </Row>
                </Container>
              </CardText>
            </CardBody>
            <a href="#" style={{ color: "black" }}>
              <CardFooter style={{ textAlign: "center", backgroundColor: "#ffbb3cd5" }}>
                รายละเอียดเพิ่มเติม
        </CardFooter>
            </a>
          </Card>
        </Col>
      </Row>


    </>

  );
}
