import React, { useState, useEffect } from "react";
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
export default function SettingTab({Account,setAccount}) {

  

  const [Selected, setSelected] = useState(0)

  useEffect(() => {
    console.log(Selected)
  }, [Selected])

  useEffect(() => {
    if(Account){
      console.log("settingAcc",Account)
    }
  }, [Account])


  return (
    <div>
      <Container>
        <hr style={{ borderWidth: "3px", backgroundColor: "#f9ad6a" }} />
        <h1>การตั้งค่าโปรไฟล์ทั่วไป</h1>
        <hr style={{ borderWidth: "3px", backgroundColor: "#f9ad6a" }} />
        <ListGroup>
          <ProfileimgPathSetting setSelected={setSelected} Selected={Selected} Account={Account}/>
          <NameSetting setSelected={setSelected} Selected={Selected} Account={Account} setAccount={setAccount}/>
          <PasswordSetting setSelected={setSelected} Selected={Selected} Account={Account}/>
          <MobileSetting setSelected={setSelected} Selected={Selected} Account={Account}/>

        </ListGroup>
      </Container>
    </div>
  );
}
