import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  Container,
  Row,
  Col,
  Button,
  CustomInput,
  FormGroup,
  Form,
  Label,
  Input,
  UncontrolledPopover,
  PopoverBody,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormFeedback,
  FormText,
  ListGroupItem,
  Collapse,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faUserCircle,
  faLock,
  faMobileAlt,
  faMapMarkerAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import SignUpMap from "../../../SignUp/SignUpMap";
import HostAPI from "../../../API/HostAPI";
import CustomerAPI from "../../../API/CustomerAPI";

const loadScript = {
  googleAPIKey: "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs",
  language: "th",
  libraries: ["places"],
};
export default function AddressSetting({
  setSelected,
  Selected,
  Account,
  setAccount,
}) {
  const [geocode, setGeoCode] = useState({ lat: 14, lng: 99 });
  const [userAddress, setUserAddress] = useState("");
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const [showAddresses, setShowAddresses] = useState("");
  const [oldGeocode, setOldGeocode] = useState({ lat: 14, lng: 99 });
  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];
  const Reset = () => {
    setSelected(0);
    setUserAddress(showAddresses);
    setGeoCode(oldGeocode);
  };

  useEffect(() => {
    if (Account) {
      if (Account.is_host) {
        console.log(Account.host);
        setShowAddresses(Account.host.address);
        setGeoCode({
          lat: Number(Account.host.latitude),
          lng: Number(Account.host.longitude),
        });
        setOldGeocode({
          lat: Number(Account.host.latitude),
          lng: Number(Account.host.longitude),
        });
        setUserAddress(Account.host.address);
      } else {
        setShowAddresses(Account.customer.address);
        setUserAddress(Account.customer.address);
        setGeoCode({
          lat: Number(Account.customer.latitude),
          lng: Number(Account.customer.longitude),
        });
        setOldGeocode({
          lat: Number(Account.customer.latitude),
          lng: Number(Account.customer.longitude),
        });
      }
    }
  }, [Account]);

  function onSubmit(event) {
    event.preventDefault();
    const data = {
      address: userAddress,
      latitude: geocode.lat,
      longitude: geocode.lng,
    };
    if (Account.is_host) {
      HostAPI.setHostInfo(cookies["mytoken"], Account.id, data).then((res) => {
        setShowAddresses(res.data.address);
        console.log(res.data);
      });
    } else {
      CustomerAPI.setCustomerInfo(cookies["mytoken"], Account.id, data).then(
        (res) => {
          setShowAddresses(res.data.address);
          console.log(res.data);
        }
      );
    }
    //////////////will implement to refresh page////////////
    setSelected(0);
  }

  const handleLocationFailed = () => {
    setShowLocationWarn(true);
  };
  const handleLocationSuccess = () => {
    setShowLocationWarn(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      handleLocationFailed();
    }
  };

  const success = (position) => {
    const currentPosition = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };
    setGeoCode(currentPosition);

    reverseGeocoding(
      parseFloat(position.coords.latitude),
      parseFloat(position.coords.longitude)
    );
  };

  const reverseGeocoding = async (lat, lng) => {
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();
    console.log("reverseGeocoding");
    console.log(data);

    if (data.status === "OK") {
      setUserAddress(data.results[0].formatted_address);
      handleLocationSuccess();
    } else {
      handleLocationFailed();
    }
  };

  const geoCoding = async (address) => {
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();

    if (data.status === "OK") {
      setGeoCode(data.results[0].geometry.location);
      handleLocationSuccess();
    } else {
      handleLocationFailed();
    }

    console.log("geoCoding");
    console.log(geocode);

    console.log(data);
  };

  const onMarkerDragEnd = (e) => {
    const lat = parseFloat(e.latLng.lat());
    const lng = parseFloat(e.latLng.lng());

    setGeoCode({ lat, lng });
    handleLocationSuccess();
    console.log("onMarkerDragEnd");
    console.log(geocode);
  };

  const [testAutoComplete, setTestAutoComplete] = useState("");

  const onLoad = (autocomplete) => {
    setTestAutoComplete(autocomplete);

    console.log("onLoad ");
    console.log(testAutoComplete);
  };
  const [showlocationWarn, setShowLocationWarn] = useState(false);

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
      const predictions = Object.values(
        always_change.length > 0 ? always_change[0] : []
      );
      if (typeof data.formatted_address !== "undefined") {
        setUserAddress(data.formatted_address);
        geoCoding(data.formatted_address);
      } else if (predictions.length > 0) {
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
    <div>
      {/*////////////////////////// imgPath Setting Part///////////////////////////////*/}
      <a
        onClick={(e) => setSelected(5)}
        style={{
          padding: "0px",
        }}
      >
        <ListGroupItem
          style={{
            backgroundColor: "#f9e07f",
            border: "0px",
            textAlign: "left",
            color: "black",
          }}
        >
          <h6>
            <a>ที่อยู่</a>
            <a style={{ marginLeft: "5%" }}>{showAddresses}</a>{" "}
            <a href="##" style={{ float: "right", color: "black" }}>
              แก้ไข
            </a>
          </h6>
        </ListGroupItem>
      </a>

      <Collapse isOpen={Selected === 5}>
        <Form onSubmit={onSubmit}>
          <ListGroupItem
            style={{
              justifyContent: "center",
            }}
          >
            <br />
            <Container style={{ maxWidth: "" }}>
              <FormGroup onSubmit={(e) => e.preventDefault()}>
                <br />
                <LoadScript
                  googleMapsApiKey={loadScript.googleAPIKey}
                  language={loadScript.language}
                  libraries={loadScript.libraries}
                >
                  <Container>
                    <SignUpMap
                      handleDragEnd={(e) => onMarkerDragEnd(e)}
                      currentGeoCode={geocode}
                    />
                  </Container>

                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <InputGroup>
                      <Input
                        type="text"
                        name="address"
                        id="exampleusername"
                        placeholder="ที่อยู่"
                        onChange={(e) => {
                          e.preventDefault();
                          setUserAddress(e.target.value);
                        }}
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        value={userAddress}
                      />

                      <InputGroupAddon addonType="append">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            getCurrentLocation();
                          }}
                          style={{ backgroundColor: "#f9e07f", border: "0px" }}
                        >
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            style={{ color: "black" }}
                          />
                        </Button>

                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            geoCoding(userAddress);
                          }}
                          style={{ backgroundColor: "#f9e07f", border: "0px" }}
                        >
                          <FontAwesomeIcon
                            icon={faSearch}
                            style={{ color: "black" }}
                          />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Autocomplete>
                </LoadScript>
              </FormGroup>
            </Container>

            <div style={{ marginTop: "1%", textAlign: "right" }}>
              <Button
                style={{
                  marginRight: "1%",
                  border: "0px",
                  backgroundColor: "#f9e07f",
                  color: "black",
                }}
                onClick={onSubmit}
                type="submit"
              >
                ยืนยัน
              </Button>
              <Button
                style={{
                  marginRight: "0.5%",
                  border: "0px",
                  backgroundColor: "grey",
                }}
                onClick={Reset}
                type="reset"
              >
                ยกเลิก
              </Button>
            </div>
          </ListGroupItem>
        </Form>
      </Collapse>
    </div>
  );
}
