import React, { useState, useEffect } from "react";
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
  FormFeedback
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
import SignUpAPI from "./SignUpAPI";
const loadScript = {
  googleAPIKey: "AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs",
  language: "th",
  libraries: ["places"],
};
export default function InformationForm({ selectState }) {
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

  const inputnumberonly = /^[0-9\b]+$/
  const inputtextornumber = /^[A-Za-z0-9]+$/
  const inputtfirstname = /^[ก-ฮะ-ไ่้๊๋็์ัํ]+$/
  const inputlastname = /^[ก-ฮะ-ไ่้๊๋็์ัํ ]+$/
  const inputpassword = /^[A-Za-z0-9]/
  const inputemail = /^[A-Za-z@0-9.!#$%&'*+-/=?^_`{|}~;]+$/


  const dayformat = "YYYY-MM-DD";

  /////////validation//////////////
  const validatepassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/
  const validateemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const validateusername = /^[A-Za-z0-9]{5,20}$/

  const [emailValid, setemailValid] = useState({ valid: false, invalid: false })
  const emailRes = ["กรุณาตรวจสอบอีเมลของคุณ", "ขออภัย อีเมลนี้ถูกใช้แล้ว"]
  var emailResCode = -1
  const [passwordValid, setpasswordValid] = useState({ valid: false, invalid: false })
  const passwordRes = ["กรุณาตรวจสอบรหัสผ่านของคุณ", "ขออภัย อีเมลนี้ถูกใช้แล้ว"]
  var passwordResCode = -1
  const [usernameValid, setusernameValid] = useState({ valid: false, invalid: false })
  const usernameRes = ["กรุณาตรวจสอบชื่อบัญชีของคุณ", "ขออภัย ชื่อบัญชีนี้ถูกใช้แล้ว"]
  var usernameResCode = -1

  const [repasswordValid, setrepasswordValid] = useState({ valid: false, invalid: false })

  const isemailValidate = () => {
    if (validateemail.test(Information.email)) {
      setemailValid({ valid: true, invalid: false })
    } else {
      setemailValid({ valid: false, invalid: true })
    }

  }
  const ispasswordValidate = () => {
    if (validatepassword.test(Information.password)) {
      setpasswordValid({ valid: true, invalid: false })
    } else {
      setpasswordValid({ valid: false, invalid: true })
    }
  }

  const isusernameValidate = () => {
    if (validateusername.test(Information.username)) {
      setusernameValid({ valid: true, invalid: false })
    } else {
      setusernameValid({ valid: false, invalid: true })
    }
  }

  const isrepasswordValidate = () => {
    if (Information.password === repassword&&Information.password.length>=1) {
      setrepasswordValid({ valid: true, invalid: false })
    } else {
      setrepasswordValid({ valid: false, invalid: true })
    }
    
  }

  //////////////////////////////
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Information);

  };
  const onChangeInformation = (e, regexp = null) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const change = {};
    change[name] = value;
    if (regexp) {
      console.log(value, regexp.test(value));
      if (value === "" || regexp.test(value)) {
        setInformation({ ...Information, ...change });
      }
    } else {
      setInformation({ ...Information, ...change });
    }

    // console.log(Information);
  };


  const onChangeradio = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    Information[name] = value;
    console.log(name,Information[name])
  }


  


  useEffect(() => {
    // setdob(moment(moment().year() - 18 + "-01-01", dayformat).format(dayformat))
    setInformation({
      ...Information,
      dob: moment(moment().year() - 18 + "-01-01", dayformat).format(dayformat),
    });
  }, []);

  //Google Map
  useEffect(() => {
    if (selectState === "Host") {
      Information.is_host = true;
    } else if (selectState === "Customer") {
      Information.is_host = false;
    }
    // console.log(Information.is_host+selectState)
  }, [selectState]);

  const [geocode, setGeoCode] = useState({ lat: 13.729025, lng: 100.775613 });

  const [userAddress, setUserAddress] = useState("");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      setShowLocationWarn(true);
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
    setShowLocationWarn(false);
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();
    console.log("reverseGeocoding");
    console.log(data);

    data.status === "OK"
      ? setUserAddress(data.results[0].formatted_address)
      : setShowLocationWarn(true);
  };

  const geoCoding = async (address) => {
    
    setShowLocationWarn(false);
    const urlapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${loadScript.googleAPIKey}&language=th`;
    const response = await fetch(urlapi);
    const data = await response.json();

    data.status === "OK"
      ? setGeoCode(data.results[0].geometry.location)
      : setShowLocationWarn(true);

    console.log("geoCoding");
    console.log(geocode);

    console.log(data);
  };

  const onMarkerDragEnd = (e) => {

    const lat = parseFloat(e.latLng.lat());
    const lng = parseFloat(e.latLng.lng());

    setGeoCode({ lat, lng });
    setShowLocationWarn(false);
    console.log("onMarkerDragEnd");
    console.log(geocode);
  };

  const [testAutoComplete, setTestAutoComplete] = useState("");

  const onLoad = (autocomplete) => {
    setTestAutoComplete(autocomplete);
    setShowLocationWarn(false);
    console.log("onLoad ");
    console.log(testAutoComplete);
  };
  const [showlocationWarn,setShowLocationWarn]=useState(false);


  const onPlaceChanged = () => {

    const data = testAutoComplete.getPlace();
    console.log("onPlaceChanged");
    console.log(testAutoComplete);
    console.log(data);
    if (typeof testAutoComplete !== "undefined" && typeof data!== "undefined") {
      setShowLocationWarn(false);
      if (typeof data.formatted_address !== "undefined") {
        setUserAddress(data.formatted_address);
        geoCoding(data.formatted_address);
      } else if(testAutoComplete.gm_accessors_.place.Ve.predictions.length>0) {
        setUserAddress(
          testAutoComplete.gm_accessors_.place.Ve.predictions[0].Lk
        );
        geoCoding(testAutoComplete.gm_accessors_.place.Ve.predictions[0].Lk);
      }
      else{
       setShowLocationWarn(true);
      }
    } else {
      setShowLocationWarn(true);
    }
  };

  //Google Map

  return (
    <div>
      <Container fluid="sm" style={{ maxWidth: "60%", minWidth: "300px" }}>
        <Form onSubmit={(e) => e.preventDefault()}>
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
                    onChange={(e) => onChangeInformation(e, inputtfirstname)}
                    value={Information.first_name}
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
                    onChange={(e) => onChangeInformation(e, inputlastname)}
                    value={Information.last_name}
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
              <Input valid={emailValid.valid} invalid={emailValid.invalid}
                type="email"
                name="email"
                placeholder="อีเมล"
                onChange={(e) => onChangeInformation(e, inputemail)}
                value={Information.email}

                onBlur={isemailValidate}
                onFocus={e => {
                  emailValid.valid = false
                  emailValid.invalid = false
                }
                }

              />
              <FormFeedback invalid={passwordValid.invalid}>กรุณาตรวจสอบอีเมลใหม่อีกครั้ง</FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{ minWidth: "45px" }}>
                  <FontAwesomeIcon icon={faUserCircle} />
                </InputGroupText>
              </InputGroupAddon>
              <Input valid={usernameValid.valid} invalid={usernameValid.invalid}
                type="text"
                name="username"
                placeholder="ชื่อผู้ใช้งาน"
                id="username"
                onChange={(e) => onChangeInformation(e, inputtextornumber)}
                value={Information.username}
                maxLength="20"
                onBlur={isusernameValidate}
                onFocus={e => {
                  usernameValid.valid = false
                  usernameValid.invalid = false
                }
                }
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
              <Input valid={passwordValid.valid} invalid={passwordValid.invalid}
                type="password"
                name="password"
                id="password"
                placeholder="รหัสผ่าน "
                onChange={(e) => onChangeInformation(e, inputpassword)}
                value={Information.password}
                maxLength="20"
                onBlur={ispasswordValidate}
                onFocus={e => {
                  passwordValid.valid = false
                  passwordValid.invalid = false
                }

                }
              />
              <FormFeedback invalid={passwordValid.invalid}>กรุณาใส่รหัสผ่านให้ตรงตามเงื่อนไข</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{ minWidth: "45px" }}>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroupText>
              </InputGroupAddon>
              <Input valid={repasswordValid.valid} invalid={repasswordValid.invalid}
                type="password"
                name="Repassword"
                placeholder="รหัสผ่านอีกครั้ง "
                onChange={(e) => setrepassword(e.target.value)}
                value={repassword}
                maxLength="20"
                onBlur={isrepasswordValidate}
                onFocus={e => {
                  repasswordValid.valid = false
                  repasswordValid.invalid = false
                }
                }
              />
              <FormFeedback invalid={repasswordValid.invalid}>กรุณาใส่รหัสผ่านให้ตรงกับรหัสผ่านก่อนหน้า</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
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
                onChange={(e) => onChangeInformation(e, inputnumberonly)}
                value={Information.mobile}
                maxLength="10"
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
              onKeyPress={(e) => e.preventDefault()}
              onChange={(e) =>
                setInformation({ ...Information, dob: e.target.value })
              }
              max={moment().format(dayformat)}
            />
          </FormGroup>
          <FormGroup>
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
                    onChange={onChangeradio}
                    value="Male"
                  />
                </Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio2"
                    name="gender"
                    label="หญิง"
                    onChange={onChangeradio}
                    value="Female"
                  />
                </Col>
                <Col style={{ minWidth: "100px" }}>
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio3"
                    name="gender"
                    label="ไม่ระบุ"
                    onChange={onChangeradio}
                    value="Other"
                  />
                </Col>
              </Row>
            </div>
          </FormGroup>

          <FormGroup onSubmit={e => e.preventDefault()} >

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

              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>

                <InputGroup >
                  <Input
                    type="text"
                    name="address"
                    id="exampleusername"
                    placeholder="ที่อยู่"
                    onChange={(e) => {
                      e.preventDefault()
                      onChangeInformation(e);
                      setUserAddress(e.target.value);
                    }}

                    onSubmit={e => { e.preventDefault() }}

                    value={userAddress}
                  />

                  <InputGroupAddon addonType="append">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        getCurrentLocation();
                      }}
                    >
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </Button>

                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        geoCoding(userAddress);
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>

                  </InputGroupAddon>
                </InputGroup>
              </Autocomplete>
            </LoadScript>
          </FormGroup>

          <FormGroup>

            {showlocationWarn? (<div><small style={{ color: "red" }}>ขออภัย กรุณาลองใหม่</small></div>):null }
            <Button onClick={(e) => onSubmit}>ถัดไป</Button>

          </FormGroup>
        </Form>
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
            อักขระพิเศษ (_!@#$%) ตั้งแต่ 5 ถึง 20 ตัว
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}
