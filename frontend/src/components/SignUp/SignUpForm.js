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
  FormText,
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


  const changeAskForm = (e) => {
    setselectState(e.target.value);
    console.log(e.target.value);
  };

  const handleAskForm = () => {
    if (selectState !== "") {
      setisSelect(true);
      console.log("PushSubmit");
    }

  };

  if (token['mytoken']) {
    // console.log("redirect pls")
    return <Redirect to="/" />
  } else {
    return (
      <div>
        <Container className="themed-container" fluid="sm">
          <Form >
            <FormGroup tag="fieldset">
              <legend>คุณต้องการสมัครเป็นอะไร</legend>
              <Row>
                <Col>
                  <FormGroup check style={{textAlign:"right"}}>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        value="Customer"
                        onChange={changeAskForm}
                      />{" "}
                      ผู้ฝากสุนัข
                    </Label>
                  </FormGroup>
                </Col>
                <Col style={{maxWidth:"10%"}}></Col>
                <Col>
                  <FormGroup check style={{textAlign:"left"}}>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        value="Host"
                        onChange={changeAskForm}
                      />{" "}
                      ผู้รับฝากสุนัข
                    </Label>
                  </FormGroup>

                </Col>

              </Row>
              {isSelect ? (
                <InformationForm />
              ) : (
                <div><Button color="secondary" onClick={handleAskForm}>
                  ถัดไป
            </Button></div>)}
            </FormGroup>

          </Form>

        </Container>
        
      </div>



    );
  }

}
