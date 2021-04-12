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
import GoogleMapLocation from "./GoogleMapLocation";

import { Autocomplete } from '@react-google-maps/api';

export default function SearchBox() {
  const googleAPIKey = "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs";

  const [geocode, setGeoCode] = useState({});

  const [showMap, setShowMap] = useState(false);

  const [userAddress, setUserAddress] = useState("");

  const onShowMap = () => {
    setShowMap(true);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      alert("Location is not supported by this browser.");
    }
  };

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setGeoCode(currentPosition);

    reverseGeocoding(position.coords.latitude, position.coords.longitude);
  };

  const reverseGeocoding = async (lat, lng) => {
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();
    data.status === "OK"
      ? setUserAddress(data.results[0].formatted_address)
      : alert("กรุณาลองใหม่อีกครั้ง");
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setGeoCode({ lat, lng });

    reverseGeocoding(lat, lng);
  };

  return (
    <Container className="search-container">
      <Row>
        <Col>
          <Form inline className="searchbox">
            <FormGroup>
              <Input
                className="exampleText"
                type="text"
                name="Location"
                id="location"
                placeholder="ที่อยู่"
                value={userAddress}
              ></Input>
            </FormGroup>

            <FormGroup className="gps">
              <Button
                onClick={() => {
                  getCurrentLocation();
                  onShowMap();
                }}
              >
                GPS
              </Button>
            </FormGroup>

            <FormGroup className="search">
              <Button>ค้นหา</Button>
            </FormGroup>
          </Form>
          {showMap ? (
            <GoogleMapLocation
              apikey={googleAPIKey}
              handleDragEnd={(e) => onMarkerDragEnd(e)}
              currentGeoCode={geocode}
            />
          ) : null}

        </Col>
      </Row>
    </Container>
  );
}
