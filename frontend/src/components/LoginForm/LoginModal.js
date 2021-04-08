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
import {useCookies} from 'react-cookie'

const LoginModal = (props) => {
  const [token,setToken] = useCookies(['mytoken'])
  //////////////////UI FrameWork//////////////////////////
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(false);
  const [backdrop, setBackdrop] = useState(true);

  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  };

  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()}>
        <Button onClick={toggle}>
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
        <ModalHeader toggle={toggle}>เข้าสู่ระบบ</ModalHeader>
        <ModalBody>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{width:"100px"}}>ชื่อผู้ใช้งาน</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="username" />
          </InputGroup>
          
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{width:"100px"}}>รหัสผ่าน</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="password" />
          </InputGroup>
          <br />
          <Button color="warning">LogIn</Button>
          <a style={{ marginLeft: "3%" }}>
            <a href="#">ลืมรหัสผ่าน</a>
          </a>
          <br />
          <br />
          <a>ยังไม่มีบัญชี?</a> <a href="#">สมัคร</a>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
