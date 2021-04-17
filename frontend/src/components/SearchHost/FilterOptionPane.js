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

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
      console.log(width)

    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)

    }
  })

  return (
    <div>


      <Collapse isOpen={isOpenPane} style={{ minWidth: "300px", width: "60vw" }}>
        <Card >
          <CardBody>

            <Form >
              <FormGroup>
                <Row>
                  <Col style={{width:"40%"}}>
                    <Label>ค้นหาในระยะ</Label>
                  </Col>
                  <Col>
                  </Col>
                </Row>

              </FormGroup>
              <FormGroup>
                <Row>
                  <Col style={{width:"40%"}}>
                    <Label>ขนาดบริเวณพื้นที่เลี้ยงขั้นต่ำ</Label>
                  </Col>
                  <Col>
                  </Col>
                </Row>

              </FormGroup>
              <FormGroup >
                
                 
                    <Label>ช่วงเวลาที่ต้องการฝาก</Label>
                  
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
                      style={{width:"40vw",minWidth:"250px"}}
                    />
               


              </FormGroup>
            </Form>
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
      </Collapse>
    </div>
  );
}
