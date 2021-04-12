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

import { Autocomplete, LoadScript } from "@react-google-maps/api";

export default function SearchBox() {
  const [geocode, setGeoCode] = useState({});

  const [showMap, setShowMap] = useState(false);

  const [userAddress, setUserAddress] = useState("");

  const [loadScript, setLoadScript] = useState({
    googleAPIKey: "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs",
    language: "th",
    libraries: ["places"],
  });
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
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();
    data.status === "OK"
      ? setUserAddress(data.results[0].formatted_address)
      : alert("กรุณาลองใหม่อีกครั้ง");
  };
  const geoCoding=async(address)=>{
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();
    
     data.status === "OK"
      ? setGeoCode(data.results[0].geometry.location)
       : alert("กรุณาลองใหม่อีกครั้ง");
       setShowMap(true);
  }

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setGeoCode({ lat, lng });

    reverseGeocoding(lat, lng);
  };
  const [testAutoComplete, setTestAutoComplete] = useState("");

  const onLoad = (autocomplete) => {

    setTestAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    const data=testAutoComplete.getPlace();

    if (testAutoComplete !== null) {
      setUserAddress(data.formatted_address);
      geoCoding(data.formatted_address);
    
    } else {
      alert("กรุณากดปุ่ม F5 แล้วลองใหม่อีกครั้ง");
    }
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey={loadScript.googleAPIKey}
        language={loadScript.language}
        libraries={loadScript.libraries}
      >
        <Container className="search-container">
          <Row>
            <Form inline className="searchbox" onSubmit={(e)=>{
              e.preventDefault();
              alert("สวัสดีค่ะบาสคุงบางขุนเทียน");
            }}>
              <FormGroup>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <Input
                    className="exampleText"
                    type="text"
                    name="Location"
                    id="location"
                    placeholder="ที่อยู่"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    onSubmit={()=>alert("สวัสดีค่ะบาสคุง")}
                  ></Input>
                </Autocomplete>
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
                <Button onClick={()=>alert("สวัสดีครับบาสคุง")}>ค้นหา</Button>
              </FormGroup>
            </Form>
          </Row>
        </Container>
        <Container className="map-container">
          {showMap ? (
            <GoogleMapLocation
              handleDragEnd={(e) => onMarkerDragEnd(e)}
              currentGeoCode={geocode}
            />
          ) : null}
        </Container>
      </LoadScript>
    </>
  );
}
