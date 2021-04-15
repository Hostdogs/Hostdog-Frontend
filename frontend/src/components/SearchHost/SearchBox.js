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
import FilterBox from "./FilterBox";
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
    console.log("reverseGeocoding data");
    console.log(data);

    data.status === "OK"
      ? setUserAddress(data.results[0].formatted_address)
      : alert("reverseGeocoding failed");
  };
  const geoCoding = async (address) => {
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();

    console.log("geoCoding data");
    console.log(data);
    data.status === "OK"
      ? setGeoCode(data.results[0].geometry.location)
      : alert("geoCoding failed");
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setGeoCode({ lat, lng });

    reverseGeocoding(lat, lng);
  };
  const [testAutoComplete, setTestAutoComplete] = useState("");

  const onLoad = (autocomplete) => {
    setTestAutoComplete(autocomplete);
    console.log("onLoad");
    console.log(testAutoComplete);
  };

  const onPlaceChanged = () => {
    const data = testAutoComplete.getPlace();

    if (
      testAutoComplete !== null &&
      typeof data.formatted_address !== "undefined"
    ) {
      setUserAddress(data.formatted_address);
      geoCoding(data.formatted_address);
      setShowMap(true);
    } else if (testAutoComplete !== null) {
      setUserAddress(testAutoComplete.gm_accessors_.place.Se.predictions[0].Jk);
      geoCoding(testAutoComplete.gm_accessors_.place.Se.predictions[0].Jk);
      setShowMap(true);
    } else {
      alert("onPlaceChanged failed");
    }
    console.log("onPlaceChanged data");
    console.log(data);
    console.log("onPlaceChanged testAutoComplete");
    console.log(testAutoComplete);
  };

  return (
    <>
      <Container className="search-container">
        <LoadScript
          googleMapsApiKey={loadScript.googleAPIKey}
          language={loadScript.language}
          libraries={loadScript.libraries}
        >
      
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
  
            <FormGroup>
            
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <Input
                  className="textlocation"
                  type="text"
                  name="Location"
                  id="location"
                  placeholder="กรุณาใส่ที่อยู่เพื่อค้นหาผู้รับฝากใกล้ๆ"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  onSubmit={() => alert("สวัสดีค่ะบาสคุง")}
       
                ></Input>
              </Autocomplete>
            </FormGroup>
            <FormGroup className="gps">
              <Button
                onClick={() => {
                  getCurrentLocation();
                  setShowMap(true);
                }}
              >
                GPS
              </Button>
            </FormGroup>

            <FormGroup className="search">
              <Button onClick={() => alert("สวัสดีครับบาสคุง")}>ค้นหา</Button>
            </FormGroup>
   
          </Form>
       
          <Container className="map-container">
            {showMap ? (
              <GoogleMapLocation
                handleDragEnd={(e) => onMarkerDragEnd(e)}
                currentGeoCode={geocode}
              />
            ) : null}
          </Container>
        </LoadScript>
        <FilterBox />
      </Container>
    </>
  );
}
