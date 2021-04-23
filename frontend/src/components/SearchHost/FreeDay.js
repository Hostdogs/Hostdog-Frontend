import React, { useState } from "react";
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

const ModalExample = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(false);
  const [unmountOnClose] = useState(false);
  const toggle = () => setModal(!modal);

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
        <ModalBody>
          <Input
            type="textarea"
            placeholder="Write something (data should remain in modal if unmountOnClose is set to false)"
            rows={5}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalExample;
