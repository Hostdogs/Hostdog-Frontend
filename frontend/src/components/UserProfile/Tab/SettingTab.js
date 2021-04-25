import React, { useState,useEffect } from "react";
import {
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Button,
  Collapse,
} from "reactstrap";
import "./SettingTab.css";
import NameSetting from "./Setting/NameSetting"
import PasswordSetting from "./Setting/PasswordSetting"
import MobileSetting from "./Setting/MobileSetting";
import ProfileimgPathSetting from "./Setting/ProfileImgSetting";
export default function SettingTab() {
  
  // const [Password, setPassword] = useState("");
  // const [Phone, setPhone] = useState("");
  // const [Address, setAddress] = useState("");

 


  // const [PasswordSetting, showPasswordSetting] = useState(false);
  // togglePasswordSetting = (e) => {
  //   showPasswordSetting(!PasswordSetting);
  //   showPhoneSetting(false);
  //   showAddressSetting(false);
  //   e.preventDefault();
  // };
  // NoChangePasswordSetting = (e) => {
  //   showPasswordSetting(!PasswordSetting);
  // };

  // const [PhoneSetting, showPhoneSetting] = useState(false);
  // togglePhoneSetting = (e) => {
  //   showPhoneSetting(!PhoneSetting);
  //   showPasswordSetting(false);
  //   showAddressSetting(false);
  //   e.preventDefault();
  // };
  // NoChangePhoneSetting = (e) => {
  //   showPhoneSetting(!PhoneSetting);
  // };

  // const [AddressSetting, showAddressSetting] = useState(false);
  // toggleAddressSetting = (e) => {
  //   showAddressSetting(!AddressSetting);
  //   showPasswordSetting(false);
  //   showPhoneSetting(false);
  //   e.preventDefault();
  // };
  // NoChangeAddressSetting = (e) => {
  //   showAddressSetting(!AddressSetting);
    
  // };
  ///////props parameter///////////////
      /// will implement for props ////
  ///////////////////////////////////////
 

  const [Selected, setSelected] = useState(0)

  useEffect(() => {
    console.log(Selected)
  }, [Selected])
  

  return (
    <div>
      <Container>
        <hr style={{ borderWidth: "3px", backgroundColor: "#f9ad6a" }}/>
        <h1>การตั้งค่าโปรไฟล์ทั่วไป</h1>
        <hr style={{ borderWidth: "3px", backgroundColor: "#f9ad6a" }} />
        <ListGroup>

          <NameSetting setSelected={setSelected} Selected={Selected}/>
          <PasswordSetting setSelected={setSelected} Selected={Selected}/>
          <MobileSetting setSelected={setSelected} Selected={Selected}/>
          <ProfileimgPathSetting setSelected={setSelected} Selected={Selected}/>
        </ListGroup>
      </Container>
    </div>
  );
}
