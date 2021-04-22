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
          {/* <NameSetting setSelected={setSelected} Selected={Selected}/> */}
          {/*////////////////////////// Password Setting Part///////////////////////////////*/}
          {/* <button
            onClick={togglePasswordSetting}
            style={{
              backgroundColor: "#f9e07f",
              borderLeft: "0px",
              borderRight: "0px",
              borderTop: "0px",
              borderRadius: "0px",
              padding: "0px",
              zIndex:"2px"
            }}
          >
            <ListGroupItem
              style={{
                backgroundColor: "#f9e07f",
                border: "0px",
                textAlign: "left",
                color: "black",
              }}
            >
              <h6>
                Password
                <span style={{ float: "right" }}>แก้ไข</span>
              </h6>
            </ListGroupItem>
          </button>
          {PasswordSetting == true ? (
            <ListGroupItem
              style={{
                borderColor: "#f9ad6a",
                borderLeft: "0px",
                borderRight: "0px",
                borderTop: "0px",
                borderWidth: "3px",
              }}
            >
              <InputGroup style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    style={{
                      backgroundColor: "#f9e07f",
                      color: "black",
                      width: "150px",
                    }}
                  >
                    รหัสผ่านปัจจุบัน
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setPassword(e.target.value)}></Input>
              </InputGroup>

              <InputGroup
                style={{
                  marginTop: "1%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    style={{
                      backgroundColor: "#f9e07f",
                      color: "black",
                      width: "150px",
                    }}
                  >
                    รหัสผ่านใหม่
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setPassword(e.target.value)}></Input>
              </InputGroup>
              <InputGroup
                style={{
                  marginTop: "1%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    style={{
                      backgroundColor: "#f9e07f",
                      color: "black",
                      width: "150px",
                    }}
                  >
                    ยืนยันรหัสผ่านใหม่
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setPassword(e.target.value)}></Input>
              </InputGroup>

              <div style={{ marginTop: "1%" }}>
                <Button
                  style={{ float: "right", marginRight: "0.5%", border:"0px", backgroundColor:"grey" }}
                  onClick={NoChangePasswordSetting}
                >
                  ยกเลิก
                </Button>
                <Button
                  style={{ float: "right", marginRight: "1%", border:"0px", backgroundColor:"#f9e07f", color:"black"  }}
                  onClick={togglePasswordSetting}
                >
                  ยืนยัน
                </Button>
                
              </div>
            </ListGroupItem>
          ) : (
            ""
          )} */}
          {/*////////////////////////// Phone Setting Part///////////////////////////////*/}
          {/* <button
            onClick={togglePhoneSetting}
            style={{
              backgroundColor: "#f9e07f",
              borderLeft: "0px",
              borderRight: "0px",
              borderTop: "0px",
              borderRadius: "0px",
              padding: "0px",
              zIndex:"2px"
            }}
          >
            <ListGroupItem
              style={{
                backgroundColor: "#f9e07f",
                border: "0px",
                textAlign: "left",
                color: "black",
              }}
            >
              <h6>
                โทรศัพท์ของคุณ <a style={{ marginLeft: "5%" }}>{Phone}</a>
                <span style={{ float: "right" }}>แก้ไข</span>
              </h6>
            </ListGroupItem>
          </button>
          {PhoneSetting == true ? (
            <ListGroupItem
              style={{
                borderColor: "black",
                borderLeft: "0px",
                borderRight: "0px",
                borderTop: "0px",
                borderWidth: "3px",
              }}
            >
              <InputGroup style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    style={{
                      backgroundColor: "#f9e07f",
                      color: "black",
                      width: "150px",
                    }}
                  >
                    เบอร์โทรศัพท์
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setPhone(e.target.value)}></Input>
              </InputGroup>

              <div style={{ marginTop: "1%" }}>
                <Button
                  style={{ float: "right", marginRight: "0.5%", border:"0px", backgroundColor:"grey" }}
                  onClick={NoChangePhoneSetting}
                >
                  ยกเลิก
                </Button>
                <Button
                  style={{ float: "right", marginRight: "1%", border:"0px", backgroundColor:"#f9e07f", color:"black"  }}
                  onClick={togglePhoneSetting}
                >
                  ยืนยัน
                </Button>
                
              </div>
            </ListGroupItem>
          ) : (
            ""
          )} */}
            {/*////////////////////////// Address Setting Part///////////////////////////////*/}
                    {/* <button
            onClick={toggleAddressSetting}
            style={{
              backgroundColor: "#f9e07f",
              borderLeft: "0px",
              borderRight: "0px",
              borderTop: "0px",
              borderRadius: "0px",
              padding: "0px",
              zIndex:"2px"
            }}
          >
            <ListGroupItem
              style={{
                backgroundColor: "#f9e07f",
                border: "0px",
                textAlign: "left",
                color: "black",
              }}
            >
              <h6>
                ที่อยู่ <a style={{ marginLeft: "5%" }}>{Address}</a>
                <span style={{ float: "right" }}>แก้ไข</span>
              </h6>
            </ListGroupItem>
          </button>
          {AddressSetting == true ? (
            <ListGroupItem
              style={{
                borderColor: "black",
                borderLeft: "0px",
                borderRight: "0px",
                borderTop: "0px",
                borderWidth: "3px",
              }}
            >
              <InputGroup style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    style={{
                      backgroundColor: "#f9e07f",
                      color: "black",
                      width: "100px",
                    }}
                  >
                    ที่อยู่
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setAddress(e.target.value)}></Input>
              </InputGroup>

              <div style={{ marginTop: "1%" }}>
                <Button
                  style={{ float: "right", marginRight: "0.5%", border:"0px", backgroundColor:"grey" }}
                  onClick={NoChangeAddressSetting}
                >
                  ยกเลิก
                </Button>
                <Button
                  style={{ float: "right", marginRight: "1%", border:"0px", backgroundColor:"#f9e07f", color:"black"  }}
                  onClick={toggleAddressSetting}
                >
                  ยืนยัน
                </Button>
                
              </div>
            </ListGroupItem>
          ) : (
            ""
          )} */}
        </ListGroup>
      </Container>
    </div>
  );
}
