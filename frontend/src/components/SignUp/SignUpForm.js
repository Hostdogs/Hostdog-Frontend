import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from "reactstrap";

import "./SignUp.css";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import InformationForm from "./InformationForm";
export default function SignUpForm() {
  const [isSelect, setisSelect] = useState(false);
  const [selectState, setselectState] = useState("");
  const Name = ["ผู้ฝากสุนัข", "ผู้รับฝากสุนัข"];
  const [token, setToken] = useCookies(['mytoken'])
  const [submitResponse, setsubmitResponse] = useState("")

  const selectRole = (e) => {
    setselectState(e.target.value);
    setsubmitResponse("");
    console.log(e.target.value);
  };

  const handleAskForm = () => {
    if (selectState !== "") {
      setisSelect(true);
      console.log("PushSubmit");
    } else {
      setsubmitResponse("กรุณาเลือกก่อนดำเนินการต่อ")
      console.log("submit")
    }

  };



  if (token['mytoken']) {
    // console.log("redirect pls")
    return <Redirect to="/" />
  } else {
    return (
      <div>
        <br /><br />
        <Container className="themed-container" fluid="sm">
          <br />
          <Form >

            <FormGroup>
              <legend>คุณต้องการสมัครเป็นอะไร</legend>
              <div >
                <Row >

                  <Col style={{ textAlign: "right" }}>
                    <CustomInput type="radio" id="roleRadio" name="roleRadio" label="ผู้ฝากสุนัข" value="Customer" onChange={selectRole} />
                  </Col>
                  <Col style={{ maxWidth: "10%" }}></Col>
                  <Col style={{ textAlign: "left" }}>
                    <CustomInput type="radio" id="roleRadio2" name="roleRadio" label="ผู้รับฝากสุนัข" value="Host" onChange={selectRole} />
                  </Col>

                </Row>

              </div>

              {isSelect ? (
                <InformationForm />
              ) : (
                <div>
                  <small style={{ color: "red" }}>{submitResponse}</small><br />
                  <Button color="secondary" onClick={handleAskForm}>
                    ถัดไป
            </Button></div>)}
            </FormGroup>

          </Form>

        </Container>
        
      </div>

      

    );
  }

}
