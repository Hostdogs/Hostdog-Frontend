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
            <FormGroup>
              <Input
                type="text"
                name="Location"
                id="location"
                placeholder="ที่อยู่"
              ></Input>
            </FormGroup>

            <FormGroup>
              <Button>GPS</Button>
            </FormGroup>

            <FormGroup>
              <Button>ค้นหา</Button>
            </FormGroup>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
