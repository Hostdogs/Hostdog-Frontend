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

import ShowAvailableDate from "./ShowAvailableDate";

export default function ServiceDetailBox(props) {
  const { serviceDetail, newAvailableDates } = props;

  const etcServicesDetail = [
    {
      name: "ราคาพาสุนัขไปเดินเล่น",
      price: serviceDetail.price_dog_walk,
      enable: serviceDetail.enable_dog_walk,
    },
    {
      name: "ราคาไปรับสุนัขต่อกิโลเมตร",
      price: serviceDetail.price_get_dog,
      enable: serviceDetail.enable_get_dog,
    },
    {
      name: "ราคาไปส่งสุนัขต่อกิโลเมตร",
      price: serviceDetail.price_deliver_dog,
      enable: serviceDetail.enable_delivery_dog,
    },
    {
      name: "ราคาอาบน้ำสุนัข",
      price: serviceDetail.price_bath_dog,
      enable: serviceDetail.enable_bath_dog,
    },
  ];

  const etcServicesElement = etcServicesDetail
    .filter((service) => {
      return service.enable === true;
    })
    .map((service, index) => {
      return (
        <FormGroup key={index}>
          <Row>
            <Col xs="8" sm="5" lg="6">
              {service.name}
            </Col>
            <Col xs="auto">{service.price} บาท</Col>
          </Row>
        </FormGroup>
      );
    });

  return (
    <div>
      <Form>
        <div>
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" style={{ marginTop: "15px" }}>
              <div
                style={{
                  backgroundColor: "#43978d",
                  padding: "10px 10px",
                  color: "white",
                  borderRadius: "3%",
                }}
              >
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
                    <br />
                  </Col>
                </Row>
                <div className="list-service">
                  <FormGroup>
                    <Row>
                      <Col xs="8" sm="5" lg="6">
                        ราคาในการรับฝากสุนัขต่อวัน
                      </Col>
                      <Col xs="auto">{serviceDetail.deposit_price} บาท</Col>
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
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <br />
                      <ShowAvailableDate
                        newAvailableDates={newAvailableDates}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </div>
            </Col>

            <Col xs="12" sm="12" md="12" lg="6" style={{ marginTop: "15px" }}>
              <div
                style={{
                  backgroundColor: "#43978d",
                  padding: "10px 10px",
                  color: "white",
                  borderRadius: "15px",
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
                <div className="list-service">{etcServicesElement}</div>
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
}
