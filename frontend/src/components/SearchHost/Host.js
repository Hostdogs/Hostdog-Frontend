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
    <div>
      <Card> 
        <CardHeader style={{backgroundColor:"#f9e07f", borderRadius:"0", color:"#264d59"}}>
        <h4 style={{position:"absolute", top:"5px", right:"10px"}}>0 กม.</h4>
        <div style={{position:"absolute", top:"7px", left:"15px"}}>
        <FreeDay />
        </div>
          <Row style={{marginTop:"2%"}}>
            <Col xs="12" sm="12" md="2" lg="2" style={{ textAlign: "center" }}>
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
                          <div style={{paddingTop:"3%"}}> </div>
                        </a>
                  <h3 className="fontsizeName">
                    <FontAwesomeIcon
                      icon={faBone}
                      className="mr-2 fa-rotate-135"
                      size="xs"
                      style={{ transform:"rotate(135deg)", color:"#43978d"}}
                    />
                    {host.hostName}
                  </h3>
                  <h5 className="fontsizeLevel">มือใหม่หัดเลี้ยง</h5>
                </Col>
                <Col xs="12" sm="12" md="12" lg="7">
                  <Row style={{ justifyContent: "center" }}>
                    <Col xs="12" md="6" lg="8" style={{ fontSize: "18px"}} className="fontsizeDetail">
                    <a className="mobile-br2">
                          <div style={{paddingTop:"3%"}}> </div>
                        </a>
                      <div>
                        รับฝากมาแล้ว <b>x ตัว</b>{" "}
                        <a className="mobile-br">
                          <br />
                        </a>
                        รวม <b>x ชั่วโมง</b>
                      </div>
                      <div>
                        ขนาดบริเวณเลี้ยง{" "}
                        <a className="mobile-br">
                          <br />
                        </a>
                        <b>xxx ตารางเมตร</b>
                      </div>
                      <a className="mobile-br2">
                          <br />
                      </a>
                    </Col>
                    <Col xs="12" md="3" lg="4" style={{ fontSize: "18px"}} className="fontsizeDetail">
                      <a style={{fontSize:"20px", color:"#264d59", fontWeight:"bold", backgroundColor:"white", borderRadius:"50%", paddingLeft:"10px",paddingRight:"10px"}}>คะแนนรีวิว</a>
              
                      <br />
                      <FontAwesomeIcon icon={faBone} size="xs"  style={{transform:"rotate(135deg)", color:"#43978d"}}/>
                      <b> xxx/5.0</b>
                    </Col>
                  </Row>
                </Col>
              </Row>   
            </Col>
          </Row>
        </CardHeader>
        <CardBody style={{backgroundColor:"#f3f4f5"}}>
          <Col style={{ padding: "0px" }}>
            <Container fluid="sm">
              <HostGallery />
            </Container>
          </Col>
        </CardBody>
        <a href="#" style={{ color: "black" }}>
          <CardFooter
            style={{ textAlign: "center", backgroundColor: "#f9e07f",color:"#264d59" }}
          >
            รายละเอียดเพิ่มเติม
          </CardFooter>
        </a>
      </Card>

      {/* ///////////////////////////////collumn ขวา//////////////////////////////////// */}
    </div>
  );
}
