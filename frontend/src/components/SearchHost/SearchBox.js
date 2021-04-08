import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
export default function SearchBox() {
  return (
    <div>
      <Container>
        <Form>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Input
                  type="text"
                  name="Location"
                  id="location"
                  placeholder="ที่อยู่"
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Button>GPS</Button>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Button>ค้นหา</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
