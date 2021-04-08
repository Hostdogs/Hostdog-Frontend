import {
  Container,
  Row,
  Col,
  Button,
  ButtonToggle,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

export default function AskForm({ handleChooseWhich, handleChangeValue }) {
  return (
    <div>
      <Container>
        <Row xs="3">
          <Col></Col>
          <Col>
            <Form>
              <FormGroup tag="fieldset">
                <legend>คุณต้องการสมัครเป็นอะไร</legend>
                <Row form>
                  <Col md={4}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="Customer"
                          onChange={handleChangeValue}
                        />{" "}
                        ผู้ฝากสุนัข
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="Host"
                          onChange={handleChangeValue}
                        />{" "}
                        พนักงงานรับฝากสุนัข
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <ButtonToggle color="secondary" onClick={handleChooseWhich}>
                ถัดไป
              </ButtonToggle>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
