import React, { useState } from "react";
import { useCookies } from "react-cookie";
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
  Form,
  FormFeedback,
} from "reactstrap";
import AuthenAPI from "../../../API/AuthenAPI";

export default function PasswordSetting({ setSelected, Selected, Account }) {
  ////////implement fake password getter/////////////////

  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const inputpassword = /^[A-Za-z0-9]/;
  const validatepassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

  const [OldPasswordValid, setOldPasswordValid] = useState({
    valid: false,
    invalid: false,
  });

  const isOldPasswordValidate = () => {
    if (validatepassword.test(OldPassword)) {
      setOldPasswordValid({ valid: true, invalid: false });
    } else {
      setOldPasswordValid({ valid: false, invalid: true });
    }
  };

  const onChangeOldPassword = (e) => {
    if (e.target.value === "" || inputpassword.test(e.target.value)) {
      setOldPassword(e.target.value);
    }
  };

  const [NewPasswordValid, setNewPasswordValid] = useState({
    valid: false,
    invalid: false,
  });

  const isNewPasswordValidate = () => {
    if (validatepassword.test(NewPassword)) {
      setNewPasswordValid({ valid: true, invalid: false });
    } else {
      setNewPasswordValid({ valid: false, invalid: true });
    }
  };

  const onChangeNewPassword = (e) => {
    if (e.target.value === "" || inputpassword.test(e.target.value)) {
      setNewPassword(e.target.value);
    }
  };

  const [ConfirmPasswordValid, setConfirmPasswordValid] = useState({
    valid: false,
    invalid: false,
  });


  const isConfirmPasswordValidate = () => {
    if (
      NewPassword === ConfirmPassword &&
      NewPassword.length >= 1
    ) {
      setConfirmPasswordValid({ valid: true, invalid: false });
    } else {
      setConfirmPasswordValid({ valid: false, invalid: true });
    }
  };

  const onChangeConfirmPassword = (e) => {
    if (e.target.value === "" || inputpassword.test(e.target.value)) {
      setConfirmPassword(e.target.value);
    }
  };

  const Reset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSelected(0);
  };

  const infoSet = (e) => {
    e.preventDefault();
    if (NewPassword === ConfirmPassword) {
      AuthenAPI.changePassword(
        cookies["mytoken"],
        Account.id,
        OldPassword,
        NewPassword
      )
        .then((res) => {
          console.log("password Changed");
          Reset();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    //////////////will implement to refresh page////////////
  };

  return (
    <div>
      {/*////////////////////////// Name Setting Part///////////////////////////////*/}
      <a
        onClick={(e) => setSelected(2)}
        style={{
          padding: "0px",
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
            <a>รหัสผ่าน</a>
            <a style={{ marginLeft: "5px" }}></a>
            <a href="##" style={{ float: "right", color: "black" }}>
              แก้ไข
            </a>
          </h6>
        </ListGroupItem>
      </a>

      <Collapse isOpen={Selected === 2}>
        <Form onSubmit={infoSet}>
          <ListGroupItem
            style={{
              justifyContent: "center",
            }}
          >
            <br />
            <InputGroup style={{ justifyContent: "center" }}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText
                  style={{
                    backgroundColor: "#f9e07f",
                    color: "black",
                    width: "120px",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  รหัสผ่านเดิม
                </InputGroupText>
              </InputGroupAddon>
              <Input
                valid={OldPasswordValid.valid}
                invalid={OldPasswordValid.invalid}
                onChange={onChangeOldPassword}
                onBlur={isOldPasswordValidate}
                onFocus={() => {
                  OldPasswordValid.valid = false;
                  OldPasswordValid.invalid = false;
                }}
                maxLength="20"
                value={OldPassword}
                style={{ minWidth: "150px", maxWidth: "30vw" }}
                type="password"
              ></Input>
              <FormFeedback
                invalid={OldPasswordValid.invalid}
                style={{ textAlign: "center" }}
              >
                กรุณาใส่รหัสผ่านให้ตรงตามเงื่อนไข
              </FormFeedback>
            </InputGroup>

            <InputGroup
              style={{
                marginTop: "1%",
                justifyContent: "center",
              }}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText
                  style={{
                    backgroundColor: "#f9e07f",
                    color: "black",
                    width: "120px",
                    justifyContent: "center",
                  }}
                >
                  รหัสผ่านใหม่
                </InputGroupText>
              </InputGroupAddon>
              <Input
                valid={NewPasswordValid.valid}
                invalid={NewPasswordValid.invalid}
                onChange={onChangeNewPassword}
                onBlur={isNewPasswordValidate}
                onFocus={() => {
                  NewPasswordValid.valid = false;
                  NewPasswordValid.invalid = false;
                }}
                maxLength="20"
                value={NewPassword}
                style={{ minWidth: "150px", maxWidth: "30vw" }}
                type="password"
              ></Input>
              <FormFeedback
                invalid={NewPasswordValid.invalid}
                style={{ textAlign: "center" }}
              >
                กรุณาใส่รหัสผ่านให้ตรงตามเงื่อนไข
              </FormFeedback>
            </InputGroup>
            <InputGroup
              style={{
                marginTop: "1%",
                justifyContent: "center",
              }}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText
                  style={{
                    backgroundColor: "#f9e07f",
                    color: "black",
                    width: "120px",
                    justifyContent: "center",
                  }}
                >
                  รหัสผ่านอีกครั้ง
                </InputGroupText>
              </InputGroupAddon>
              <Input
                valid={ConfirmPasswordValid.valid}
                invalid={ConfirmPasswordValid.invalid}
                onChange={onChangeConfirmPassword}
                onBlur={isConfirmPasswordValidate}
                onFocus={() => {
                  ConfirmPasswordValid.valid = false;
                  ConfirmPasswordValid.invalid = false;
                }}
                maxLength="20"
                value={ConfirmPassword}
                style={{ minWidth: "150px", maxWidth: "30vw" }}
                type="password"
              ></Input>
              <FormFeedback
                invalid={ConfirmPasswordValid.invalid}
                style={{ textAlign: "center" }}
              >
                กรุณาใส่รหัสผ่านให้ตรงกับรหัสผ่านก่อนหน้า
              </FormFeedback>
            </InputGroup>

            <div style={{ marginTop: "1%", textAlign: "right" }}>
              <Button
                style={{
                  marginRight: "1%",
                  border: "0px",
                  backgroundColor: "#f9e07f",
                  color: "black",
                }}
                onClick={infoSet}
                type="submit"
              >
                ยืนยัน
              </Button>
              <Button
                style={{
                  marginRight: "0.5%",
                  border: "0px",
                  backgroundColor: "grey",
                }}
                onClick={Reset}
                type="reset"
              >
                ยกเลิก
              </Button>
            </div>
          </ListGroupItem>
        </Form>
      </Collapse>
    </div>
  );
}
