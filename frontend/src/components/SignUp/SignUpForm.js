import React from 'react'
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default function SignUpForm() {
    return (
        <div>
            <Container>
  <Row>
    <Col></Col>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col>
    <Form>
      <FormGroup>
      <FormGroup tag="fieldset">
        <legend>คุณต้องการสมัครเป็นอะไร</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            ต้องการเป็น "ผู้ฝาก"
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            ต้องการเป็น  "ผู้รับฝาก"
          </Label>
        </FormGroup>

        </FormGroup>
        <Label >ชื่อ </Label>
        <Input type="text"  />
        <Label >นามสกุล </Label> 
        <Input type="text"  /> 
      </FormGroup>
      <FormGroup>
        <Label >อีเมลล์</Label>
        <Input type="email" />

        <Label for="examplePassword">เบอร์โทรศัพท์</Label>
        <Input type="text" />
      </FormGroup>
      <FormGroup>
        <Label>กรอกรหัสผ่าน</Label>
        <input type="password"/>
      </FormGroup>
      <FormGroup>
        <Label>กรอกรหัสผ่านอีกครั้ง</Label>
        <input type="password"/>
      </FormGroup>
      <FormGroup>
        <Label>ที่อยู่</Label>
        <Input type="textarea" />
      </FormGroup>
      <Button>Submit</Button>

    </Form>

    </Col>
    <Col></Col>
  </Row>
</Container>
        </div>
    )
}
