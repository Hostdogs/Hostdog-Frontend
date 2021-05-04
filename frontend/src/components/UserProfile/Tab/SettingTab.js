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
import NameSetting from "./Setting/NameSetting";
import PasswordSetting from "./Setting/PasswordSetting";
import MobileSetting from "./Setting/MobileSetting";
import ProfileimgPathSetting from "./Setting/ProfileImgSetting";
import AddressSetting from "./Setting/AddressSetting";
export default function SettingTab({ Account, setAccount }) {
  const [Selected, setSelected] = useState(0);

  useEffect(() => {
    console.log(Selected);
  }, [Selected]);

  useEffect(() => {
    if (Account) {
      console.log("settingAcc", Account);
    }
  }, [Account]);

  return (
    <div>
      <Container>
        <h1
          style={{
            marginTop: "15px",
            marginRight: "-10px",
            marginLeft: "-10px",
          }}
        >
          <ins>การตั้งค่าโปรไฟล์ทั่วไป</ins>
        </h1>
        <ListGroup style={{ marginTop: "15px" }}>
          <ProfileimgPathSetting
            setSelected={setSelected}
            Selected={Selected}
            Account={Account}
            setAccount={setAccount}
          />
          <NameSetting
            setSelected={setSelected}
            Selected={Selected}
            Account={Account}
            setAccount={setAccount}
          />
          <PasswordSetting
            setSelected={setSelected}
            Selected={Selected}
            Account={Account}
          />
          <MobileSetting
            setSelected={setSelected}
            Selected={Selected}
            Account={Account}
          />
          <AddressSetting
            setSelected={setSelected}
            Selected={Selected}
            Account={Account}
          />
        </ListGroup>
      </Container>
    </div>
  );
}
