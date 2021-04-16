import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  CustomInput,
  FormGroup,
  Label,
  Input,
  UncontrolledPopover,
  PopoverBody,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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
import SignUpMap from "./SignUpMap";
import moment from "moment-timezone";
import SignUpAPI from "./SignUpAPI"
export default function InformationForm({selectState}) {
  const [repassword, setrepassword] = useState("");

  const [Information, setInformation] = useState({
    is_host: false,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    mobile: "",
    address: "",
    gender: "",
  });

  const dayformat = "YYYY-MM-DD";

  const onSubmit = () => {
    console.log(Information);
    
  };
  const onChangeInformation = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    Information[name] = value;
    console.log(Information);
  };

  useEffect(() => {
    // setdob(moment(moment().year() - 18 + "-01-01", dayformat).format(dayformat))
    setInformation({
      ...Information,
      dob: moment(moment().year() - 18 + "-01-01", dayformat).format(dayformat),
    });
  }, []);
  //Google Map
  useEffect(() => {
    if(selectState==="Host"){
      Information.is_host = true;
    }else if(selectState==="Customer"){
      Information.is_host = false;
    }
    // console.log(Information.is_host+selectState)
    
  },[selectState])

  const [geocode, setGeoCode] = useState({lat:13.729025,lng:100.775613});

 

  const [userAddress, setUserAddress] = useState("");
 

  const loadScript = {
    googleAPIKey: "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs",
    language: "th",
    libraries: ["places"],
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
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };
    setGeoCode(currentPosition);

    reverseGeocoding(
      parseFloat(position.coords.latitude),
      parseFloat(position.coords.longitude)
    );

    console.log(geocode);

  };

  const reverseGeocoding = async (lat, lng) => {
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();
   console.log(data);

    data.status === "OK"
      ? setUserAddress(data.results[0].formatted_address)
      : alert("reverseGeoCoding error");


  };
 

  const geoCoding = async (address) => {
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();
    console.log(geocode);

    console.log(data);
    data.status === "OK"
      ? setGeoCode(data.results[0].geometry.location)
      : alert("geocoding error");

  };

  const onMarkerDragEnd = (e) => {
    const lat = parseFloat(e.latLng.lat());
    const lng = parseFloat(e.latLng.lng());

    setGeoCode({ lat, lng });

    console.log(geocode);
  };


  const [testAutoComplete, setTestAutoComplete] = useState("");

  const onLoad = (autocomplete) => {
    setTestAutoComplete(autocomplete);

    console.log(testAutoComplete);
  };

  const onPlaceChanged = () => {
    const data = testAutoComplete.getPlace();
console.log(testAutoComplete)
    if (
      testAutoComplete !== null &&
      typeof data.formatted_address !== "undefined"
    ) {
      setUserAddress(data.formatted_address);
      geoCoding(data.formatted_address);

    } else if (testAutoComplete !== null) {
      setUserAddress(testAutoComplete.gm_accessors_.place.Se.predictions[0].Jk);
      geoCoding(testAutoComplete.gm_accessors_.place.Se.predictions[0].Jk);

    } else {
      alert("ขออภัย ไม่พบที่อยู่ที่ระบุ");
    }

  };

  //Google Map

  return (
    <div>
      <Container fluid="sm" style={{ maxWidth: "60%", minWidth: "300px" }}>
        <br />
        <Label>รายละเอียดส่วนตัว</Label>
        <Row>
          <Col>
            <FormGroup style={{ minWidth: "250px" }}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText style={{ minWidth: "45px" }}>
                    ชื่อ
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="ชื่อ"
                  onChange={onChangeInformation}
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup style={{ minWidth: "250px" }}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>นามสกุล</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="นามสกุล"
                  onChange={onChangeInformation}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{ minWidth: "45px" }}>
                <FontAwesomeIcon icon={faAt} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="email"
              name="email"
              placeholder="อีเมล"
              onChange={onChangeInformation}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{ minWidth: "45px" }}>
                <FontAwesomeIcon icon={faUserCircle} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="username"
              placeholder="ชื่อผู้ใช้งาน"
              id="username"
              onChange={onChangeInformation}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{ minWidth: "45px" }}>
                <FontAwesomeIcon icon={faLock} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="รหัสผ่าน "
              onChange={onChangeInformation}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{ minWidth: "45px" }}>
                <FontAwesomeIcon icon={faLock} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="password"
              name="Repassword"
              placeholder="รหัสผ่านอีกครั้ง "
              onChange={(e) => setrepassword(e.target.value)}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup >
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{ minWidth: "45px" }}>
                <FontAwesomeIcon icon={faMobileAlt} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="mobile"
              placeholder="หมายเลขโทรศัพท์มือถือ"
              onChange={onChangeInformation}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <br />
          <Label>วัน/เดือน/ปีเกิด</Label>

          <Input
            type="date"
            name="dob"
            placeholder="วัน/เดือน/ปี"
            value={Information.dob}
            onChange={(e) =>
              setInformation({ ...Information, dob: e.target.value })
            }
            max={moment().format(dayformat)}
          />
        </FormGroup>
        <FormGroup > 
          <br />
          <Label>เพศ</Label>
          <div>
            <Row>
              <Col>
                <CustomInput
                  type="radio"
                  id="exampleCustomRadio"
                  name="gender"
                  label="ชาย"
                  onChange={onChangeInformation}
                  value="Male"
                />
              </Col>
              <Col>
                <CustomInput
                  type="radio"
                  id="exampleCustomRadio2"
                  name="gender"
                  label="หญิง"
                  onChange={onChangeInformation}
                  value="Female"
                />
              </Col>
              <Col style={{ minWidth: "100px" }}>
                <CustomInput
                  type="radio"
                  id="exampleCustomRadio3"
                  name="gender"
                  label="ไม่ระบุ"
                  onChange={onChangeInformation}
                  value="Other"
                />
              </Col>
            </Row>
          </div>
        </FormGroup>
        <FormGroup
          onSubmit={onSubmit}
        >
          <br />
          <LoadScript
            googleMapsApiKey={loadScript.googleAPIKey}
            language={loadScript.language}
            libraries={loadScript.libraries}
          >
            <Label>ที่อยู่</Label>
            <Container>
         
                <SignUpMap
                  handleDragEnd={(e) => onMarkerDragEnd(e)}
                  currentGeoCode={geocode}
                />
     
            </Container>
       
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
              <InputGroup >
             
                <Input
                  type="text"
                  name="address"
                  id="exampleusername"
                  placeholder="ที่อยู่"
                  onChange={(e) => {
                    onChangeInformation(e);
                    setUserAddress(e.target.value);
                  }}
                  value={userAddress}
                  
                />

                <InputGroupAddon addonType="append">
                  <Button
                    onClick={() => {
                      getCurrentLocation();
                    }}
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </Button>
                  <Button>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Autocomplete>
          </LoadScript>
        </FormGroup>

        <FormGroup>
          <Button onClick={onSubmit}>ถัดไป</Button>
        </FormGroup>
      </Container>

      <UncontrolledPopover trigger="focus" placement="top" target="username">
        <PopoverBody className="Popover">
          <div>
            ตัวอักษร (a-z, A-Z) หรือ
            <br />
            ตัวเลข (0-9) ตั้งแต่ 5 ถึง 20 ตัว
          </div>
        </PopoverBody>
      </UncontrolledPopover>
      <UncontrolledPopover trigger="focus" placement="top" target="password">
        <PopoverBody className="Popover">
          <div>
            ตัวอักษร (a-z, A-Z) หรือ
            <br />
            ตัวเลข (0-9) หรือ
            <br />
            อักขระพิเศษ (!@#$%) ตั้งแต่ 5 ถึง 20 ตัว
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}
