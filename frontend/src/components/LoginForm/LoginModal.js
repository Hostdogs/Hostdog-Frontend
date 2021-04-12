import React, { useState } from "react";


import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  
} from "reactstrap";
import {useCookies} from 'react-cookie'
import { useHistory } from "react-router-dom";
import './LoginModal.css'

const LoginModal = (props) => {
  const [token,setToken] = useCookies(['mytoken'])
  const [userName, setuserName] = useState('')
  const [passWord, setpassWord] = useState('')
  const [loginRes, setloginRes] = useState(" ")
  let history = useHistory()

  const loginBtn = () =>{
    if(userName==='' || passWord === ''){
      setloginRes("กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านให้ถูกต้อง")
    }else{
      setToken('mytoken',"hellothisistesttoken")
      history.push('/')

    }
    
  }
  const onClose = () => {
    toggle();
    setloginRes("")
  }
  //////////////////UI FrameWork//////////////////////////
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [backdrop, setBackdrop] = useState(true);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  };

  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()} >
        <Button onClick={onClose}>
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
            <Input onChange ={e=>setuserName(e.target.value)} placeholder="username" />
          </InputGroup>
          
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{width:"100px"}}>รหัสผ่าน</InputGroupText>
            </InputGroupAddon>
            <Input type="password" onChange={e=>setpassWord(e.target.value)} placeholder="password" />
          </InputGroup>
          
          <small style={{color:"red"}}>{loginRes}</small>
          <br/><br />
          <Button color="warning" onClick={loginBtn}>ยืนยัน</Button>
          <a style={{ marginLeft: "3%" }}>
            <a href="#" onClick={e=>console.log("{userName},{passWord}")}>ลืมรหัสผ่าน</a>
          </a>
          <br />
          <br />
          <a>ยังไม่มีบัญชี?</a> <a href="/signup">สมัคร</a>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
