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

export default function FilterOptionPane({ isOpenPane }) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const toggleDate = () => setIsDateOpen(!isDateOpen);

  const distance = [
    "ระยะทาง:0-10 กม.",
    "ระยะทาง:11-20 กม.",
    "ระยะทาง:21-30 กม.",
  ];

  const [choiceDistance, setChoiceDistance] = useState(0);

  const area = [
    "พื่้นที่เลี้ยงเท่าไหร่ก็ได้",
    "พื่้นที่เลี้ยง:0-10 ตร.ม.",
    "พื่้นที่เลี้ยง:11-20 ตร.ม.",
    "พื่้นที่เลี้ยง:21-30 ตร.ม.",
    "พื่้นที่เลี้ยง:31-40 ตร.ม.",
  ];

  const [choiceArea, setChoiceArea] = useState(0);
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
      console.log(width);
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
            <h1 className="FontSize">ค้นหาผู้รับฝาก</h1>
            <hr style={{ borderWidth: "3px", borderColor:"#ffe080", width:"90%",textAlign:"left" }} />
            <br/>
            <Container style={{ paddingLeft: "10%", paddingRight: "10%" }}>
              <Form>
                <SearchBox />

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
                      {distance[choiceDistance]}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setChoiceDistance(0)}>
                        {distance[0]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceDistance(1)}>
                        {distance[1]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceDistance(2)}>
                        {distance[2]}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </FormGroup>
                <FormGroup>
                  <UncontrolledDropdown>
                    <Label style={{ width: "225px" }}>
                      ขนาดบริเวณพื้นที่เลี้ยงขั้นต่ำ
                    </Label>
                    <DropdownToggle
                      caret
                      style={{ backgroundColor: "#ffe080", color:"black", border: "0px" }}
                    >
                      {area[choiceArea]}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setChoiceArea(0)}>
                        {area[0]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceArea(1)}>
                        {area[1]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceArea(2)}>
                        {area[2]}
                      </DropdownItem>
                      <DropdownItem onClick={() => setChoiceArea(3)}>
                        {area[3]}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </FormGroup>
                <FormGroup>
                  <Label style={{ width: "300px" }}>
                    ช่วงเวลาที่ต้องการฝาก
                  </Label>
                  <div style={{ textAlign: "center" }}>
                    <DateRange
                      className="daterangepick"
                      editableDateInputs={true}
                      onChange={(item) => setSelectionRange([item.selection])}
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
                  <Button style={{ backgroundColor: "#ffe080", border: "0px", color:"black" }}>
                    ค้นหา
                  </Button>
                </FormGroup>
              </Form>
            </Container>

            {/* <Row>
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {distance[choiceDistance]}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setChoiceDistance(0)}>
                    {distance[0]}
                  </DropdownItem>
                  <DropdownItem onClick={() => setChoiceDistance(1)}>
                    {distance[1]}
                  </DropdownItem>
                  <DropdownItem onClick={() => setChoiceDistance(2)}>
                    {distance[2]}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle caret>{area[choiceArea]}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setChoiceArea(0)}>
                    {area[0]}
                  </DropdownItem>
                  <DropdownItem onClick={() => setChoiceArea(1)}>
                    {area[1]}
                  </DropdownItem>
                  <DropdownItem onClick={() => setChoiceArea(2)}>
                    {area[2]}
                  </DropdownItem>
                  <DropdownItem onClick={() => setChoiceArea(3)}>
                    {area[3]}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <DropdownToggle caret onClick={toggleDate}>
                ช่วงเวลา
              </DropdownToggle>
              <Collapse isOpen={isDateOpen} className="datecollapse" >
      
                    <DateRange
                      className="daterangepick"
                      editableDateInputs={true}
                      onChange={(item) => setSelectionRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={selectionRange}
                      minDate={new Date()}
                      maxDate={endOfMonth(addMonths(new Date(), 1))}
                      months={2}
                      direction={width>400?"horizontal":"vertical"}
                    />

              </Collapse>
            </Row> */}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
