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

export default function CustomerSignUpForm() {
  return (
    <div>
      <Row xs="3">
        <Col></Col>
        <Col>
          <Form>
            <legend>ลงทะเบียนเป็น ผู้ฝากสุนัข</legend>
            <FormGroup>
              <Label for="Name">ชื่อ</Label>
              <Input type="text" name="Name" placeholder="ชื่อ" />
              <Label for="Name">นามสกุล</Label>
              <Input type="text" name="Name" placeholder="นามสกุล" />
              <Label for="exampleEmail">อีเมล</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="อีเมล"
              />
              <Label for="examplePassword">รหัสผ่าน</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="รหัสผ่าน "
              />
              <Label for="againPassword">รหัสผ่านอีกครั้ง</Label>
              <Input
                type="password"
                name="againPassword"
                placeholder="รหัสผ่านอีกครั้ง "
              />
              <Label for="exampleText">ที่อยู่</Label>

              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>

            <FormGroup>
              <Button>ถัดไป</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
