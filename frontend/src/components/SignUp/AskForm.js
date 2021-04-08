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

export default function AskForm({ handleChooseWhich, handleChangeValue }) {
  return (
    <div>
      <Row xs="3">
        <Col></Col>
        <Col>
          <Form>
            <FormGroup tag="fieldset">
              <legend>คุณต้องการสมัครเป็นอะไร</legend>
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
            </FormGroup>
            <Button onClick={handleChooseWhich}>ถัดไป</Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
