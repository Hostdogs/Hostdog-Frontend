import React, { useState } from "react";
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
import AskForm from "./AskForm";
import "./SignUp.css";

export default function SignUpForm() {
  const [isSelect, setisSelect] = useState(false);
  const [selectState, setselectState] = useState("");
  const Name = ["ผู้ฝากสุนัข", "ผู้รับฝากสุนัข"];
  const changeAskForm = (e) => {
    setselectState(e.target.value);
    console.log(e.target.value);
  };

  const handleAskForm = () => {
    setisSelect(true);
    console.log("PushSubmit");
  };

  return (
    <div>
      {!isSelect ? (
        <AskForm
          handleChangeValue={changeAskForm}
          handleChooseWhich={handleAskForm}
        />
      ) : (
        <Container className="themed-container" fluid={true}>
          <Form className="signup-container">
            <Col sm={4}>
              <legend>
                ลงทะเบียนเป็น{" "}
                <h2>"{selectState === "Host" ? Name[1] : Name[0]}"</h2>
              </legend>
              <FormGroup>
                <Label for="Name">ชื่อ</Label>
                <Input type="text" name="Name" placeholder="ชื่อ" />
              </FormGroup>
              <FormGroup>
                <Label for="Name">นามสกุล</Label>
                <Input type="text" name="Name" placeholder="นามสกุล" />
              </FormGroup>
              <FormGroup>
                <Label for="Name">เบอร์โทรติดต่อ</Label>
                <Input type="text" name="Tel" placeholder="เบอร์โทรติดต่อ" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleDate">วันเกิด</Label>
                <Input
                  type="date"
                  name="date"
                  id="exampleDate"
                  placeholder="วัน/เดือน/ปี"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">อีเมล</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="อีเมล"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">รหัสผ่าน</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="รหัสผ่าน "
                />
              </FormGroup>

              <FormGroup>
                <Label for="againPassword">รหัสผ่านอีกครั้ง</Label>
                <Input
                  type="password"
                  name="againPassword"
                  placeholder="รหัสผ่านอีกครั้ง "
                />
              </FormGroup>
              <FormGroup>
                <Button>ถัดไป</Button>
              </FormGroup>
            </Col>
          </Form>
        </Container>
      )}
    </div>
  );
}
