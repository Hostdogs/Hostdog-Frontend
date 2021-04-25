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
import "./FreeDay.css";

import DatePicker, { Calendar } from "react-multi-date-picker"
const ModalExample = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(false);
  const [unmountOnClose] = useState(false);
  const toggle = () => setModal(!modal);
  const [dateList, setdateList] = useState([new Date()])


  // console.log(dateList)
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
  
            <Calendar
              multiple
              value={dateList}
              onChange={e=>console.log(e)}

            />
       

        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalExample;
