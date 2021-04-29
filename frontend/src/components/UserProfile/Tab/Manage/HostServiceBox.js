import React, { useEffect, useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  ButtonGroup,
  Input,
  Form,
  FormGroup,
  CustomInput,
  Label,
} from "reactstrap";
import "./ManageTab.css";
import SelectMultiDate from "./SelectMultiDate";

const startHostService = {
  price_dog_walk: "",
  price_get_dog: "",
  price_delivery_dog: "",
  price_bath_dog: "",
  dog_walk_enable: false,
  get_dog_enable: false,
  delivery_dog_enable: false,
  bath_dog_enable: false,
  deposit_price: "",
  late_price: "",
};
export default function HostServiceBox() {
  const [hostService, setHostService] = useState(startHostService);

  function onEnableChange(event) {
    const name = event.target.name;
    const value = event.target.checked;
    setHostService((prevHostService) => {
      return {
        ...prevHostService,
        [name]: changeValue(name, value),
      };
    });
  }

  function changeValue(name, value) {
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false) {
      return false;
    } else if (!isNaN(value)) {
      return Number(value);
    } else if (value === "") {
      return null;
    } else {
      return value;
    }
  }

  useEffect(() => {
    console.log(hostService);
  }, [hostService]);

  return (
    <div>
      <Form>
        <div>
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" style={{ marginTop: "15px" }}>
              <div
                className="col-left-manage"
                style={{
                  backgroundColor: "#43978d",
                  padding: "10px 10px",
                  color: "white",
                  borderRadius: "3%",
                }}
              >
                <FormGroup>
                  <Row>
                    <Col>
                      <h4>บริการทั่วไป</h4>
                      <hr
                        style={{
                          width: "50%",
                          margin: "0",
                          backgroundColor: "#264d59",
                        }}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="list-service">
                  <FormGroup>
                    <Row>
                      <Col xs="12" sm="5" lg="6">
                        ราคาในการรับฝากสุนัขต่อวัน
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input type="number" style={{ blockSize: "30px" }} />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col xs="12" sm="5" lg="6">
                        ค่ามัดจำในการฝากสุนัข
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input type="number" style={{ blockSize: "30px" }} />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                  </FormGroup>
                </div>
                <FormGroup>
                  <Row>
                    <Col xs="12" sm="12" lg="12" className="list-service">
                      วันที่ว่างในการดูแลสุนัข
                    </Col>

                    <Col
                      xs="12"
                      sm="12"
                      lg="12"
                      style={{ textAlign: "center" }}
                    >
                      <br />
                      <SelectMultiDate />
                    </Col>
                  </Row>
                </FormGroup>
              </div>
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" style={{ marginTop: "15px" }}>
              <div
                className="col-right-manage"
                style={{
                  backgroundColor: "#43978d",
                  padding: "10px 10px",
                  color: "white",
                  borderRadius: "3%",
                }}
              >
                <FormGroup>
                  <Row>
                    <Col>
                      <h4>บริการเพิ่มเติม</h4>
                      <hr
                        style={{
                          width: "50%",
                          margin: "0",
                          backgroundColor: "#264d59",
                        }}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="list-service">
                  <FormGroup>
                    <Row>
                      <Col xs="12" sm="5" lg="6">
                        ราคาพาสุนัขไปเดินเล่น
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input type="number" style={{ blockSize: "30px" }} />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <CustomInput
                          type="switch"
                          id="walk_dog"
                          name="dog_walk_enable"
                          label="พาสุนัขไปเดินเล่น"
                          onChange={onEnableChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup style={{ marginTop: "20px" }}>
                    <Row>
                      <Col xs="12" sm="5" lg="6">
                        ราคาไปรับสุนัขต่อกิโลเมตร
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input type="number" style={{ blockSize: "30px" }} />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <CustomInput
                          type="switch"
                          id="get_dog"
                          name="get_dog_enable"
                          label="ไปรับสุนัข"
                          onChange={onEnableChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup style={{ marginTop: "20px" }}>
                    <Row>
                      <Col xs="12" sm="5" lg="6">
                        ราคาไปส่งสุนัขต่อกิโลเมตร
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input type="number" style={{ blockSize: "30px" }} />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <CustomInput
                          type="switch"
                          id="send_dog"
                          name="delivery_dog_enable"
                          label="ไปส่งสุนัข"
                          onChange={onEnableChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup style={{ marginTop: "20px" }}>
                    <Row>
                      <Col xs="12" sm="5" lg="6">
                        ราคาอาบน้ำสุนัข
                      </Col>
                      <Col xs="5" sm="3" lg="3">
                        <Input type="number" style={{ blockSize: "30px" }} />
                      </Col>
                      <Col xs="auto">บาท</Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <CustomInput
                          type="switch"
                          id="bath_dog"
                          name="bath_dog_enable"
                          label="อาบน้ำสุนัข"
                          onChange={onEnableChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>

          <hr />
        </div>
      </Form>
    </div>
  );
}
