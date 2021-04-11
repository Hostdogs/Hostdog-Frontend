import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "./SearchHost.css";
import { useState } from "react";

export default function SearchBox() {
  const googleAPIKey = "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs";

  const [state, setState] = useState({
    long: "hello",
    lat: "hello",
  });

  const [userAddress, setUserAddress] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(reverseGeocoding);
    } else {
      alert("Location is not supported by this browser.");
    }
  };

  const reverseGeocoding = async (position) => {
    setState({
      long: position.coords.longitude,
      lat: position.coords.latitude,
    });

    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${googleAPIKey}&language=th`;

    const response = await fetch(urlapi);
    const data = await response.json();
    setUserAddress(data.results[0].formatted_address);
  };

  return (
    <Form className="form-search">
      <Row form>
        <FormGroup className="searchbox">
          <Input
            type="text"
            name="Location"
            id="location"
            placeholder="ที่อยู่"
            value={userAddress}
          ></Input>
        </FormGroup>

        <FormGroup className="gps">
          <Button onClick={getLocation}>GPS</Button>
          <Label>Latitude:{state.lat}</Label>
          <Label>Longitude:{state.long}</Label>
          <Label>userAddress:{userAddress}</Label>
        </FormGroup>

        <FormGroup className="search">
          <Button>ค้นหา</Button>
        </FormGroup>
      </Row>
    </Form>
  );
}
