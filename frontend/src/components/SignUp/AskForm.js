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
        <Row >
          
            <Form>
              <FormGroup tag="fieldset">
                <legend>คุณต้องการสมัครเป็นอะไร</legend>
                <Row >
                  <Col>
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
                  <Col>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="Host"
                          onChange={handleChangeValue}
                        />{" "}
                        ผู้รับฝากสุนัข
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <ButtonToggle color="secondary" onClick={handleChooseWhich}>
                ถัดไป
              </ButtonToggle>
            </Form>
          

        </Row>
      </Container>
    </div>
  );
}
