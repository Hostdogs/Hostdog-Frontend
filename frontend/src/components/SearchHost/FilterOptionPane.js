import {
  UncontrolledDropdown,
  Collapse,
  Button,
  CardBody,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { addDays, addMonths, endOfMonth } from "date-fns";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import "./SearchHost.css";
import SearchBox from "./SearchBox";
import moment from "moment";
import { useCookies } from "react-cookie";
import HostAPI from "../API/HostAPI";


export default function FilterOptionPane({ setisSearch ,setHostData ,setisLoad}) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const toggleDate = () => setIsDateOpen(!isDateOpen);
  const [userAddress, setUserAddress] = useState("");
  const [geocode, setGeoCode] = useState({lat:13.729025,lng:100.775613});
  const [cookies,setCookie] = useCookies(["mytoken","user_id"])
  const [isSubmit,setIsSubmit] =useState(false)

  const handleSubmit = e =>{
      e.preventDefault();
      setisSearch(true);
      setShowSubmitFailed(false)
      setTimeout(() => {
        window.scrollTo({
          top: 1250,
          behavior: 'smooth',
        })
      }, 500);

      const stDate = moment(selectionRange[0].startDate).format("YYYY-MM-DD")
      const endDate = moment(selectionRange[0].endDate).format("YYYY-MM-DD")
      // console.log(userAddress,distance[choiceDistance],area[choiceArea],userAddress,stDate,endDate,geocode)
      HostAPI.getHostInformation(cookies["mytoken"],distance[choiceDistance],stDate,endDate,geocode.lat,geocode.lng).then(res=>{
        console.log(res.data)
        // let data = []
        // for(const object in res.data){
        //   console.log(object)
        //   data.push(object)
        // }
        setHostData(res.data)
        setisLoad(true)
      }).catch(error=>{
        if(error.response){
          console.log(error.response)
        }
        
      })
      
    }
   const handleSubmitFailed=(e)=>{
    e.preventDefault();

    setShowSubmitFailed(true)

   }
    const [showSubmitFailed, setShowSubmitFailed] = useState(false);
  const showDistance = [
    "ไม่เกิน 10 กิโลเมตร",
    "ไม่เกิน 20 กิโลเมตร",
    "ไม่เกิน 30 กิโลเมตร",
    "ทั้งหมด",
  ];
  const distance = [
    10,20,30,100
  ]
  

  const [choiceDistance, setChoiceDistance] = useState(3);

  // const showArea = [
  //   "เท่าไหร่ก็ได้",
  //   "เล็ก(0-50 ตร.ม.)",
  //   "กลาง(50-150 ตร.ม.)",
  //   "ใหญ่(150-400 ตร.ม.)",
    
  // ];

  // const [choiceArea, setChoiceArea] = useState(0);
  // const area = [
  //   [0,400],[0,50],[50,150],[150,400]
  // ]
  const dayformat = "YYYY-MM-DD";
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      // console.log(width);
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  
  return (
    <div>
      <Container style={{}}>
        <Card style={{borderColor:"#ffe080", borderWidth:"10px"}}>
          <CardBody>
            <h1 className="FontSize" style={{marginLeft:"5%"}}>ค้นหาผู้รับฝาก</h1>
            <hr style={{ borderWidth: "3px", borderColor:"#ffe080", width:"90%",textAlign:"left" }} />
            <br/>
            <Container style={{ paddingLeft: "10%", paddingRight: "10%" }}>
    
                <SearchBox userAddress={userAddress} setUserAddress={setUserAddress} geocode={geocode} setGeoCode={setGeoCode} setIsSubmit={setIsSubmit} />

                <FormGroup>
                  <UncontrolledDropdown>
                    <Label style={{ width: "225px" }}>ค้นหาในระยะ</Label>
                    <DropdownToggle
                      caret
                      style={{
                        backgroundColor: "#ffe080",
                        border: "0px",
                        textAlign: "center",
                        color:"black"
                      }}
                    >
                      {showDistance[choiceDistance]}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setChoiceDistance(0)}>
                        {showDistance[0]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceDistance(1)}>
                        {showDistance[1]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceDistance(2)}>
                        {showDistance[2]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceDistance(3)}>
                        {showDistance[3]}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </FormGroup>
                {/* <FormGroup>
                  <UncontrolledDropdown>
                    <Label style={{ width: "225px" }}>
                      ขนาดบริเวณพื้นที่เลี้ยงขั้นต่ำ
                    </Label>
                    <DropdownToggle
                      caret
                      style={{ backgroundColor: "#ffe080", color:"black", border: "0px" }}
                    >
                      {showArea[choiceArea]}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setChoiceArea(0)}>
                        {showArea[0]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceArea(1)}>
                        {showArea[1]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceArea(2)}>
                        {showArea[2]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceArea(3)}>
                        {showArea[3]}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </FormGroup> */}
                <FormGroup>
                  <Label style={{ width: "300px" }}>
                    ช่วงเวลาที่ต้องการฝาก
                  </Label>
                  <div style={{ textAlign: "center" }}>
                    <DateRange
                      className="daterangepick"
                      editableDateInputs={true}
                      onChange={(item) => {setSelectionRange([item.selection])}}
                      moveRangeOnFirstSelection={false}
                      ranges={selectionRange}
                      minDate={new Date()}
                      maxDate={addMonths(new Date(), 2)}
                      months={2}
                      direction={width > 1400 ? "horizontal" : "vertical"}
                      style={{ width: "" }}
                    />
                  </div>
                  
                </FormGroup>
                <FormGroup style={{ textAlign: "right" }}>
                <small style={{ color: "red",paddingRight: "10px"}}>{showSubmitFailed? ("กรุณาใส่ที่อยู่ใหม่อีกครั้ง "):(" ")}</small>
                  <Button type="submit" onClick={e=>{isSubmit?handleSubmit(e):handleSubmitFailed(e)}} style={{ backgroundColor: "#ffe080", border: "0px", color:"black" }}>
                    ค้นหา
                  </Button>

                  {/* {showSubmitFailed? (
          <div>
            <small style={{ color: "red" }}>กรุณาใส่ที่อยู่ใหม่อีกครั้ง</small>
          </div>
        ) : null} */}
                </FormGroup>
            </Container>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
