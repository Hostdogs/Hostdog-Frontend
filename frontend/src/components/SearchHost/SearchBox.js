import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroupAddon,
  InputGroup,
  ButtonToggle,
  ButtonGroup,
} from "reactstrap";
import "./SearchHost.css";
import { useState } from "react";
import GoogleMapLocation from "./GoogleMapLocation";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import {
  faFilter,
  faMapMarkerAlt,
  faSearch,
  faSearchLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterOptionPane from "./FilterOptionPane";
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
    console.log("onPlaceChanged data");
    console.log(data);
    console.log("onPlaceChanged testAutoComplete");
    console.log(testAutoComplete);
    
    if (typeof testAutoComplete !== "undefined") {
      if (typeof data.formatted_address !== "undefined") {
        setUserAddress(data.formatted_address);
        geoCoding(data.formatted_address);
        
      } else {
        setUserAddress(
          testAutoComplete.gm_accessors_.place.Ve.predictions[0].Lk
        );
        geoCoding(testAutoComplete.gm_accessors_.place.Ve.predictions[0].Lk);
      }
      setShowMap(true);
    } else {
      alert("ขออภัย ไม่พบที่อยู่ที่ระบุ");
    }

  };

  return (
    <LoadScript
      googleMapsApiKey={loadScript.googleAPIKey}
      language={loadScript.language}
      libraries={loadScript.libraries}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormGroup>
          <Label>ที่อยู่ของคุณ</Label>
          <Button
            onClick={() => {
              getCurrentLocation();
              // setShowMap(true);
            }}
            style={{
              backgroundColor: "#ffe080",
              border: "0px",
              marginLeft: "1%",
            }}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{color:"black"}} />
          </Button>
          <Button
            onClick={() => alert("สวัสดีครับบาสคุง")}
            style={{
              backgroundColor: "#ffe080",
              border: "0px",
              marginLeft: "0.5%",
            }}
          >
            <FontAwesomeIcon icon={faSearch} style={{color:"black"}}/>
          </Button>
          <InputGroup style={{marginTop:"1%"}}>
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
                style={{width:"100%"}}
              />
            </Autocomplete>
          </InputGroup>
        </FormGroup>
      </Form>

      {/* <Container className="map-container">
            {showMap ? (
              <GoogleMapLocation
                handleDragEnd={(e) => onMarkerDragEnd(e)}
                currentGeoCode={geocode}
              />
            ) : null}
          </Container> */}
    </LoadScript>
  );
}
