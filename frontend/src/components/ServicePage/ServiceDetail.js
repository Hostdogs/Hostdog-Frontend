import React from "react";
import { Container, Row, Col } from "reactstrap";
import DogAPI from "../API/DogAPI"
import moment from "moment-timezone";

export default function ServiceDetail(props) {
  const { serviceInfo ,customerMealLabel,listDogFeedingTime,mealPrice,hostService} = props;

  let detailServices = [
    { name: "", price: 0, isSelect: false },
    { name: "", price: 0, isSelect: false },
    { name: "", price: 0, isSelect: false },
    { name: "", price: 0, isSelect: false },
    { name: "", price: 0, isSelect: false },
    {name:"ค่าบริการผู้รับฝาก",price:0,isSelect:false},// host deposit
  ];

  const getDatesBetweenDates = (startDate, endDate) => {
    let dates = []
    const theDate = new Date(startDate)
    while (theDate <=endDate) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
    }
    return dates
  }
  var amountOfMeal=0
if(serviceInfo.service_start_time!==null&&serviceInfo.service_end_time!==null){

    let start_time=new Date(serviceInfo.service_start_time)
    let end_time=new Date(serviceInfo.service_end_time)

    let start_day=start_time.getDate();
    let end_day=end_time.getDate();
    let start_month=start_time.getMonth();
    let end_month=end_time.getMonth();
    let start_year=start_time.getFullYear();
    let end_year=end_time.getFullYear();

    let start_date=new Date(start_year,start_month,start_day)
    let end_date=new Date(end_year,end_month,end_day)
    let all_date_in_service=getDatesBetweenDates(start_date,end_date);
    
    let day_service=all_date_in_service.length
    // console.log("all_date_in_service");
    // console.log(all_date_in_service)
    // console.log("day_service");
    // console.log(day_service);
    // console.log(listDogFeedingTime)
    for (var i=0;i<all_date_in_service.length;i++){
      for(var j=0;j<listDogFeedingTime.length;j++){
        // console.log("all_date_in_service[i]");
        // console.log(all_date_in_service[i]);
        // console.log("listDogFeedingTime[j].time");
        // console.log(listDogFeedingTime[j].time);
        let dateISOFormat=moment(all_date_in_service[i]).format("YYYY-MM-DD");
        // console.log("dateISOFormat")
        // console.log(dateISOFormat)
        let dogfeedingtime_date=new Date(dateISOFormat+ 'T' +listDogFeedingTime[j].time);
        // console.log("dogfeedingtime_date");
        // console.log( dogfeedingtime_date);
        // console.log("start_time");
        // console.log (start_time);
        // console.log("end_time");
        // console.log(end_time);
        // console.log(start_time<dogfeedingtime_date && dogfeedingtime_date<end_time);
        if(start_time<dogfeedingtime_date && dogfeedingtime_date<end_time){
              amountOfMeal+=1
        }
      }
    }
    detailServices[5].price=hostService.deposit_price*day_service
    detailServices[5].isSelect=true;
  }
  
  if (serviceInfo.service_meal_type !== null) {
    

    detailServices[0].isSelect = true;
    detailServices[0].name =customerMealLabel+" "+serviceInfo.service_meal_weight +" กรัม/มื้อ จำนวน "+amountOfMeal+" มื้อ";

    let mealTotalPrice=(mealPrice*serviceInfo.service_meal_weight)*amountOfMeal
    detailServices[0].price=mealTotalPrice;
    // console.log(detailServices)

  }

  if (serviceInfo.is_dog_walk!== null) {
    if (serviceInfo.is_dog_walk=== true) {
      
      detailServices[1].name = "พาสุนัขไปเดินเล่น";
      detailServices[1].isSelect = true;
      detailServices[1].price=hostService.price_dog_walk
    }
  }

  if (serviceInfo.is_get_dog !== null) {
    if (serviceInfo.is_get_dog === true) {
      detailServices[2].name = "ให้ผู้รับฝากไปรับสุนัข";
      detailServices[2].isSelect = true;
      detailServices[2].price=hostService.price_get_dog
    }
  }

  if (serviceInfo.is_delivery_dog !== null) {
    if (serviceInfo.is_delivery_dog === true) {
      detailServices[3].name = "ให้ผู้รับฝากไปส่งสุนัข";
      detailServices[3].isSelect = true;
      detailServices[3].price=hostService.price_deliver_dog;

    }
  }

  if (serviceInfo.is_bath_dog !== null) {
    if (serviceInfo.is_bath_dog === true) {
      detailServices[4].name = "อาบน้ำสุนัข";
      detailServices[4].price=hostService.price_bath_dog ;
      detailServices[4].isSelect = true;
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
