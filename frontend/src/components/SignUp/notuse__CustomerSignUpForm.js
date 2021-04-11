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

export default function CustomerSignUpForm(props) {
  return (
    <div>
      <Container className="themed-container">
        <Row xs="3">
          <Col md={3}></Col>
          <Col md={7}>
            <Form>
              <legend>
                ลงทะเบียนเป็น <h2>"ผู้ฝากสุนัข"</h2>
              </legend>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Name">ชื่อ</Label>
                    <Input type="text" name="Name" placeholder="ชื่อ" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Name">นามสกุล</Label>
                    <Input type="text" name="Name" placeholder="นามสกุล" />
                  </FormGroup>
                </Col>
              </Row>
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
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
