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
import { useHistory } from "react-router-dom";
import './LoginModal.css'

const LoginModal = ({buttonLabel,className,MouseOver,MouseLeave}) => {
  const [token,setToken] = useCookies(['mytoken'])
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [loginRes, setloginRes] = useState(" ")
  let history = useHistory()

  const loginBtn = () =>{
    if(username==='' || password === ''){
      setloginRes("กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านให้ถูกต้อง")
    }else{
      // LoginAPI.Login(username,password).then(res => {
      //   console.log(res)
      //   setToken('mytoken',res.data.token)
      //   history.push('/')
      // }).catch(error =>{
      //   setloginRes("กรุณาตรวจสอบชื่อหรือรหัสผ่านของคุณ")

      // })
      
      //fake Login///
      setToken('mytoken',"hellothisisfaketoken")
      history.push('/')

    }
    
  }
  const onClose = () => {
    toggle();
    setloginRes("")
  }
  //////////////////UI FrameWork//////////////////////////
  

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(false);
  const [backdrop, setBackdrop] = useState(true);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  };
  ///////////////regexp/////////////////////////////////
  const inputusername = /^[A-Za-z0-9]+$/
  const inputpassword = /^[A-Za-z0-9]/
  const handleChangeusername = (e) =>{
    if (e.target.value === '' || inputusername.test(e.target.value)) {
      setusername(e.target.value)
    }
  }
  const handleChangepassword = (e) =>{
    if (e.target.value === '' || inputpassword.test(e.target.value)) {
      setpassword(e.target.value)
    }
  }


  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()} >
        <Button onClick={onClose} onMouseLeave={MouseLeave} onMouseOver={MouseOver} style={{ paddingRight: "10px", borderWidth: "3px", borderColor: "#264d59", backgroundColor: "#264d59", color: "#f9e07f", borderRadius: "7px", fontSize: "20px" }}>
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
        <Form>
        <ModalBody>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{width:"100px"}}>ชื่อผู้ใช้งาน</InputGroupText>
            </InputGroupAddon>
            <Input onChange ={handleChangeusername} placeholder="username" value={username}/>
          </InputGroup>
          
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{width:"100px"}}>รหัสผ่าน</InputGroupText>
            </InputGroupAddon>
            <Input type="password" onChange={handleChangepassword} placeholder="password" value={password}/>
          </InputGroup>
          
          <small style={{color:"red"}}>{loginRes}</small>
          <br/><br />
          <Button color="warning" type="submit" onClick={loginBtn}>ยืนยัน</Button>
          <a style={{ marginLeft: "3%" }}>
            <a href="#" onClick={e=>console.log({userName},{passWord})}>ลืมรหัสผ่าน</a>
          </a>
          <br />
          <br />
          <a>ยังไม่มีบัญชี?</a> <a href="/signup">สมัคร</a>
        </ModalBody>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
