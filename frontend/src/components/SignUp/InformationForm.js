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
import AuthenAPI from "../API/AuthenAPI";
import CustomerAPI from "../API/CustomerAPI";
import HostAPI from "../API/HostAPI";
import "./SignUp.css";
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
    // dob: "",
    mobile: "",
    // address: "",
    gender: "",
    account_number: "111111111111",
  });
  const [cookies, setCookie, removeCookie] = useCookies(["mytoken", "user_id"]);
  // console.log(Information.is_host)
  const inputnumberonly = /^[0-9\b]+$/;
  const inputusername = /^[A-Za-z0-9]+$/;
  const inputtfirstname = /^[ก-ฮะ-ไ่้๊๋็์ัํ]+$/;
  const inputlastname = /^[ก-ฮะ-ไ่้๊๋็์ัํ ]+$/;
  const inputpassword = /^[A-Za-z0-9]/;
  const inputemail = /^[A-Za-z@0-9.!#$%&'*+-/=?^_`{|}~;]+$/;

  const dayformat = "YYYY-MM-DD";

  /////////validation//////////////
  const validatepassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
  const validateemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateusername = /^[A-Za-z0-9]{5,20}$/;
  const [emailValid, setemailValid] = useState({
    valid: false,
    invalid: false,
  });
  const emailRes = ["กรุณาตรวจสอบอีเมลของคุณ", "ขออภัย อีเมลนี้ถูกใช้แล้ว"];
  var emailResCode = -1;
  const [passwordValid, setpasswordValid] = useState({
    valid: false,
    invalid: false,
  });
  const passwordRes = [
    "กรุณาตรวจสอบรหัสผ่านของคุณ",
    "ขออภัย อีเมลนี้ถูกใช้แล้ว",
  ];
  var passwordResCode = -1;
  const [usernameValid, setusernameValid] = useState({
    valid: false,
    invalid: false,
  });
  const usernameRes = [
    "กรุณาตรวจสอบชื่อบัญชีของคุณ",
    "ขออภัย ชื่อบัญชีนี้ถูกใช้แล้ว",
  ];
  var usernameResCode = -1;

  const [repasswordValid, setrepasswordValid] = useState({
    valid: false,
    invalid: false,
  });

  const isemailValidate = () => {
    if (validateemail.test(Information.email)) {
      setemailValid({ valid: true, invalid: false });
    } else {
      setemailValid({ valid: false, invalid: true });
    }
  };
  const ispasswordValidate = () => {
    if (validatepassword.test(Information.password)) {
      setpasswordValid({ valid: true, invalid: false });
    } else {
      setpasswordValid({ valid: false, invalid: true });
    }
  };

  const isusernameValidate = () => {
    if (validateusername.test(Information.username)) {
      setusernameValid({ valid: true, invalid: false });
    } else {
      setusernameValid({ valid: false, invalid: true });
    }
  };

  const isrepasswordValidate = () => {
    if (
      Information.password === repassword &&
      Information.password.length >= 1
    ) {
      setrepasswordValid({ valid: true, invalid: false });
    } else {
      setrepasswordValid({ valid: false, invalid: true });
    }
  };

  //////////////////////////////

  async function onSubmit(e) {
    e.preventDefault();
    const info = {
      is_host: Information.is_host,
      username: Information.username,
      email: Information.email,
      password: Information.password,
      account_number: Information.account_number,
    };

    console.log(info);
    try {
      const resp = await AuthenAPI.initSignUp(info);
      if (resp.data.is_host) {
        const profileInfo = {
          first_name: Information.first_name,
          last_name: Information.last_name,
          gender: Information.gender,
          mobile: Information.mobile,
          dob: Information.dob,
          address: Information.address,
          latitude: geocode.lat,
          longitude: geocode.lng,
        };
        console.log("host", profileInfo, resp);
        HostAPI.ProfileInitHost(resp.data.id, profileInfo, resp.data.token)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
            }
          });
      } else {
        const profileInfo = {
          first_name: Information.first_name,
          last_name: Information.last_name,
          gender: Information.gender,
          mobile: Information.mobile,
          dob: Information.dob,
          address: userAddress,
          latitude: geocode.lat,
          longitude: geocode.lng,
        };
        console.log("customer", profileInfo, resp);
        CustomerAPI.ProfileInitCustomer(
          resp.data.id,
          profileInfo,
          resp.data.token
        )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
            }
          });
      }
      setCookie("mytoken", resp.data.token);
      setCookie("user_id", resp.data.id);
    } catch (error) {
      // let errorMessage = "";
      // if (error.response.data.is_host !== undefined) {
      //   errorMessage += "email";
      // }
      // if (error.response.data.username !== undefined) {
      //   errorMessage += "username";
      // }
      // alert(errorMessage);
      // console.log(error.response.data);
    }
  }

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

  const onChangeradio = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    Information[name] = value;
    console.log(name, Information[name]);
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
    if (selectState === "Host") {
      // Information.is_host = true;
      setInformation({ ...Information, is_host: true });
    } else if (selectState === "Customer") {
      // Information.is_host = false;
      setInformation({ ...Information, is_host: false });
    }
    // console.log(Information.is_host+selectState)
  }, [selectState]);

  const [geocode, setGeoCode] = useState({ lat: 13.729025, lng: 100.775613 });

  const [userAddress, setUserAddress] = useState("");

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
              <Input
                valid={emailValid.valid}
                invalid={emailValid.invalid}
                type="email"
                name="email"
                placeholder="อีเมล"
                onChange={(e) => onChangeInformation(e, inputemail)}
                value={Information.email}
                onBlur={isemailValidate}
                onFocus={(e) => {
                  emailValid.valid = false;
                  emailValid.invalid = false;
                }}
              />
              <FormFeedback invalid={passwordValid.invalid}>
                กรุณาตรวจสอบอีเมลใหม่อีกครั้ง
              </FormFeedback>
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
                valid={usernameValid.valid}
                invalid={usernameValid.invalid}
                type="text"
                name="username"
                placeholder="ชื่อผู้ใช้งาน"
                id="username"
                onChange={(e) => onChangeInformation(e, inputusername)}
                value={Information.username}
                maxLength="20"
                onBlur={isusernameValidate}
                onFocus={(e) => {
                  usernameValid.valid = false;
                  usernameValid.invalid = false;
                }}
              />
            </InputGroup>

            <FormText style={{ textAlign: "left" }}>
              <li style={{ marginLeft: "5px" }}>
                {" "}
                ตัวอักษรภาษาอังกฤษ หรือ ตัวเลขตั้งแต่ 5 ถึง 20 ตัว
              </li>
            </FormText>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{ minWidth: "45px" }}>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                valid={passwordValid.valid}
                invalid={passwordValid.invalid}
                type="password"
                name="password"
                id="password"
                placeholder="รหัสผ่าน "
                onChange={(e) => onChangeInformation(e, inputpassword)}
                value={Information.password}
                maxLength="20"
                onBlur={ispasswordValidate}
                onFocus={(e) => {
                  passwordValid.valid = false;
                  passwordValid.invalid = false;
                }}
              />
              <FormFeedback invalid={passwordValid.invalid}>
                กรุณาใส่รหัสผ่านให้ตรงตามเงื่อนไข
              </FormFeedback>
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
                valid={repasswordValid.valid}
                invalid={repasswordValid.invalid}
                type="password"
                name="Repassword"
                placeholder="รหัสผ่านอีกครั้ง "
                onChange={(e) => setrepassword(e.target.value)}
                value={repassword}
                maxLength="20"
                onBlur={isrepasswordValidate}
                onFocus={(e) => {
                  repasswordValid.valid = false;
                  repasswordValid.invalid = false;
                }}
              />
              <FormFeedback invalid={repasswordValid.invalid}>
                กรุณาใส่รหัสผ่านให้ตรงกับรหัสผ่านก่อนหน้า
              </FormFeedback>
            </InputGroup>
            <FormText style={{ textAlign: "left",marginLeft: "5px" }}>
              <li>
                ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่อย่างน้อย 1 ตัว
              </li>
              <li>ตัวอักษรภาษาอังกฤษพิมพ์เล็กอย่างน้อย 1 ตัว</li>
              <li>ตัวเลขอย่างน้อย 1 ตัว</li>
              <li>รหัสผ่านตั้งแต่ 8 ถึง 20 ตัว</li>
            </FormText>
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
              value={Information.dob||moment(moment().year() - 18 + "-01-01", dayformat).format(dayformat)}
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
                    value="male"
                  />
                </Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio2"
                    name="gender"
                    label="หญิง"
                    onChange={onChangeradio}
                    value="female"
                  />
                </Col>
                <Col style={{ minWidth: "100px" }}>
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio3"
                    name="gender"
                    label="ไม่ระบุ"
                    onChange={onChangeradio}
                    value="none"
                  />
                </Col>
              </Row>
            </div>
          </FormGroup>

          <FormGroup onSubmit={(e) => e.preventDefault()}>
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
                <InputGroup>
                  <Input
                    type="text"
                    name="address"
                    id="exampleusername"
                    placeholder="ที่อยู่"
                    onChange={(e) => {
                      e.preventDefault();
                      onChangeInformation(e);
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
                      style={{backgroundColor:"#f9e07f", border:"0px"}}
                    >
                      <FontAwesomeIcon icon={faMapMarkerAlt} style={{color:"black"}} />
                    </Button>

                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        geoCoding(userAddress);
                      }}
                      style={{backgroundColor:"#f9e07f", border:"0px"}}
                    >
                      <FontAwesomeIcon icon={faSearch} style={{color:"black"}}/>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Autocomplete>
            </LoadScript>
          </FormGroup>

          <FormGroup>
            {showlocationWarn ? (
              <div>
                <small style={{ color: "red" }}>ขออภัย กรุณาลองใหม่</small>
              </div>
            ) : null}
            <Button onClick={onSubmit} style={{backgroundColor:"#264d59"}}>ถัดไป</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}
