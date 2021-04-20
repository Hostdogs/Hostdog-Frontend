import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function ServiceDetail(props) {
  const { serviceInfo } = props;
  let detailServices = [
    { name: "", price: 1000, isSelect: false },
    { name: "", price: 0, isSelect: false },
    { name: "", price: 100, isSelect: false },
    { name: "", price: 0, isSelect: false },
    { name: "", price: 0, isSelect: false },
    { name: "", price: 0, isSelect: false },
    { name: "", price: 0, isSelect: false },
    { name: "", price: 0, isSelect: false },
  ];

  if (serviceInfo.service_is_over_night !== null) {
    detailServices[0].isSelect = true;
    if (serviceInfo.service_is_over_night === true) {
      detailServices[0].name = "ฝากข้ามคืน";
    } else {
      detailServices[0].name = "ฝากระหว่างวัน";
    }
  }

  if (serviceInfo.service_meal_type !== null) {
    detailServices[1].isSelect = true;
    detailServices[1].name = serviceInfo.service_meal_type;
  }

  if (serviceInfo.service_meal_per_day !== null) {
    detailServices[2].isSelect = true;
    detailServices[2].name = serviceInfo.service_meal_per_day;
  }

  if (serviceInfo.service_meal_weight !== null) {
    detailServices[3].isSelect = true;
    detailServices[3].name = serviceInfo.service_meal_weight;
  }

  if (serviceInfo.service_is_walk !== null) {
    if (serviceInfo.service_is_walk === true) {
      detailServices[4].name = "พาสุนัขไปเดินเล่น";
      detailServices[4].isSelect = true;
    }
  }

  if (serviceInfo.service_is_get_dog !== null) {
    if (serviceInfo.service_is_get_dog === true) {
      detailServices[5].name = "ให้ผู้รับฝากไปรับสุนัข";
      detailServices[5].isSelect = true;
    }
  }

  if (serviceInfo.service_is_deliver_dog !== null) {
    if (serviceInfo.service_is_deliver_dog === true) {
      detailServices[6].name = "ให้ผู้รับฝากไปส่งสุนัข";
      detailServices[6].isSelect = true;
    }
  }

  if (serviceInfo.service_is_dog_bath !== null) {
    if (serviceInfo.service_is_dog_bath === true) {
      detailServices[7].name = "อาบน้ำสุนัข";
      detailServices[7].isSelect = true;
    }
  }

  const selectedService = detailServices.filter((service) => {
    return service.isSelect === true;
  });

  const detailServiceElements = selectedService.map((detail, index) => {
    return (
      <Row key={index}>
        <Col xs="7">
          <p>- {detail.name}</p>
        </Col>
        <Col xs="5" align="right">
          {detail.price} บาท
        </Col>
      </Row>
    );
  });

  let totalPrice = 0;
  selectedService.forEach((service) => {
    totalPrice += service.price;
  });

  return (
    <div>
      <Row>
        <h4>รายละเอียด</h4>
      </Row>
      {detailServiceElements}
      <hr></hr>
      <Row>
        <Col xs="12" align="right">
          <h4>ราคารวม</h4>
        </Col>
      </Row>
      <Row>
        <Col xs="12" align="right">
          <p>{totalPrice} บาท</p>
          <hr></hr>
        </Col>
      </Row>
      <br />
    </div>
  );
}
