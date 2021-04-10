import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import "./SearchHost.css";

export default function SearchBox() {
  return (
        <Form className="form-search">
          <Row form>
            <FormGroup className="searchbox">
              <Input
                type="text"
                name="Location"
                id="location"
                placeholder="ที่อยู่"
              ></Input>
            </FormGroup>

            <FormGroup className="gps">
              <Button>GPS</Button>
            </FormGroup>

            <FormGroup className="search">
              <Button>ค้นหา</Button>
            </FormGroup>
          </Row>
        </Form>

  );
}
