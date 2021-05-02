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
export default function SearchBox({
  userAddress,
  setUserAddress,
  geocode,
  setGeoCode,
  setIsSubmit,
}) {
  const [loadScript, setLoadScript] = useState({
    googleAPIKey: "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs",
    language: "th",
    libraries: ["places"],
  });

  const [showlocationWarn, setShowLocationWarn] = useState(false);

  const handleLocationFailed=()=>{

    setIsSubmit(false);
    setShowLocationWarn(true);
  }
const handleLocationSuccess=()=>{
  setIsSubmit(true);
  setShowLocationWarn(false);
}
  
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      handleLocationFailed();
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

    if(data.status === "OK"){
      setUserAddress(data.results[0].formatted_address);
      handleLocationSuccess();
    }else{
      handleLocationFailed();
    }
    
  };
  const geoCoding = async (address) => {

    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();

    console.log("geoCoding data");
    console.log(data);
    if (data.status === "OK"){
      setGeoCode(data.results[0].geometry.location);
      handleLocationSuccess();
    }else{
      handleLocationFailed();
    }
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
      const gm_accessors = Object.values(testAutoComplete);
      const place = Object.values(gm_accessors[2].place);
      const always_change = Object.values(place[0].predictions);
      const predictions = Object.values(always_change.length>0?always_change[0]:[]);
      if (typeof data.formatted_address !== "undefined") {
        setUserAddress(data.formatted_address);
        geoCoding(data.formatted_address);

      } else if (predictions.length>0) {
        setUserAddress(predictions[0]);
        geoCoding(predictions[0]);

      } else {
        handleLocationFailed();
      }
    } else {
      handleLocationFailed();
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={loadScript.googleAPIKey}
      language={loadScript.language}
      libraries={loadScript.libraries}
    >
      <FormGroup onSubmit={(e) => e.preventDefault()}>
        <Label>ที่อยู่ของคุณ</Label>
        <Button
          onClick={() => {
            getCurrentLocation();
          }}
          onSubmit={(e) => e.preventDefault()}
          style={{
            backgroundColor: "#ffe080",
            border: "0px",
            marginLeft: "1%",
          }}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "black" }} />
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            geoCoding(userAddress);
          }}
          style={{
            backgroundColor: "#ffe080",
            border: "0px",
            marginLeft: "0.5%",
          }}
        >
          <FontAwesomeIcon icon={faSearch} style={{ color: "black" }} />
        </Button>
        
        
        <InputGroup
          style={{ marginTop: "1%" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              className="textlocation"
              type="text"
              name="Location"
              id="location"
              placeholder="กรุณาใส่ที่อยู่เพื่อค้นหาผู้รับฝากใกล้ๆ"
              value={userAddress}
              onChange={(e) => {
                e.preventDefault();
                setUserAddress(e.target.value);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                geoCoding(userAddress);
              }}
              style={{ width: "100%" }}
            />
          </Autocomplete>
        </InputGroup>
        <div style={{width:"300px"}}>
          <small style={{ color: "red",paddingLeft:"10px"}}>{showlocationWarn? ("ขออภัย กรุณาลองใหม่ภายหลัง"):(" ")}</small>
        </div>

      </FormGroup>
      <GoogleMapLocation
        handleDragEnd={(e) => onMarkerDragEnd(e)}
        currentGeoCode={geocode}
      />
      <br />
    </LoadScript>
  );
}
