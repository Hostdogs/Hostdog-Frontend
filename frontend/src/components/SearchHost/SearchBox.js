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

  const googleAPIKey="AIzaSyBWV06MM0QFyVnkuA1nHJhQ4altZjovYNs";

  const [state, setState] = useState({
    long: null,
    lat: null,
  });

  const [userAddress,setUserAddress ]=useState("");

  const setPosition=(position)=>{
    setState({
      lat:position.coords.latitude,
      long:position.coords.longitude
    });

    reverseGeocoding();
  }

  const getLocation = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
     alert("Location is not supported by this browser.");
    }
  };


  const reverseGeocoding=()=>{

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.lat},${state.long}&key=${googleAPIKey}&language=th`)
    .then(response=>response.json())
    .then(data=>(setUserAddress(data.results[0].formatted_address)))
    .catch(()=>alert("Please try again!"))
    
  }

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
