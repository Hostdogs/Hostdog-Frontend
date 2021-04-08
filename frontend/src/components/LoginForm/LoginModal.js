import React, { useState } from "react";
import Tab from './LoginTab'

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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";


const LoginModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [backdrop, setBackdrop] = useState("static");

  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  };

  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()}>
        <Button color="danger" onClick={toggle}>
          {buttonLabel}
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={unmountOnClose}
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggle}>Log In</ModalHeader>
        <ModalBody>
          <Tab />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
