import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./AvailableHost.css";
import DatePicker, { Calendar } from "react-multi-date-picker"
import ShowAvailableDate from "../UserProfile/Tab/ServiceDetail/ShowAvailableDate";
import HostAvailableDateAPI from "../API/HostAvailableDateAPI";
import { useCookies } from "react-cookie";


export default function AvailableHost({ host, className }) {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"])
  const [modal, setModal] = useState(false);
  const [unmountOnClose] = useState(false);
  const toggle = () => setModal(!modal);
  // const [dateList, setdateList] = useState([new Date()])
  const [newAvailableDates, setnewAvailableDates] = useState([])
  useEffect(() => {
    if (host) {
      // console.log("host", host)
      HostAvailableDateAPI.GetHostAvailableDate(cookies["mytoken"], host.account).then(res => {
        // console.log(res.data)
        setnewAvailableDates(formatDate(res.data));
      })
    }
  }, [host])
  function formatDate(dates) {
    const newDates = [];
    dates.forEach((date) => {

      newDates.push(new Date(date.date));
    });
    // console.log(newDates);
    return newDates;
  }
  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()}>
        <FontAwesomeIcon
          className="calendarIcon"
          icon={faCalendarAlt}
          size="lg"
          onClick={toggle}
          style={{ cursor: "pointer" }}
        />
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={unmountOnClose}
      >
        <ModalHeader toggle={toggle}>วันที่รับบริการ</ModalHeader>
        <ModalBody >
          <div style={{textAlign: 'center'}}>
            <ShowAvailableDate
              newAvailableDates={newAvailableDates}
            />
          </div>


        </ModalBody>
      </Modal>
    </div>
  )
}

