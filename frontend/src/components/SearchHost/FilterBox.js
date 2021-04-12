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
  Input,
} from "reactstrap";


import { useState } from "react";
export default function FilterBox() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Filter
      </Button>
      <Collapse isOpen={isOpen} className="filter-container">
        <Card>
          <CardBody>
            <Row>
              <UncontrolledDropdown>
                <DropdownToggle caret>ระยะทาง</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>0-10 กม.</DropdownItem>
                  <DropdownItem>11-20 กม.</DropdownItem>
                  <DropdownItem>21-30 กม.</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown>
                <DropdownToggle caret>วันว่าง</DropdownToggle>
                <DropdownMenu>
                <DropdownItem>
                    <Input type="checkbox" id="checkbox1" /> ทุกวัน
                  </DropdownItem>
                  <DropdownItem>
                    <Input type="checkbox" id="checkbox1" /> จันทร์-ศุกร์
                  </DropdownItem>
                  <DropdownItem>
                    <Input type="checkbox" id="checkbox2" /> เสาร์-อาทิตย์
                  </DropdownItem>
                  <DropdownItem>
                    <Input type="checkbox" id="checkbox3" /> จันทร์
                  </DropdownItem>
                  <DropdownItem>
                    <Input type="checkbox" id="checkbox4" /> อังคาร
                  </DropdownItem>
                  <DropdownItem>
                    <Input type="checkbox" id="checkbox5" /> พุธ
                  </DropdownItem>
                  <DropdownItem>
                    <Input type="checkbox" id="checkbox6" /> พฤหัสบดี
                  </DropdownItem>
                  <DropdownItem>
                    <Input type="checkbox" id="checkbox7" />ศุกร์
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown>
                <DropdownToggle caret>พื้นที่เลี้ยง</DropdownToggle>
                <DropdownMenu>
                <DropdownItem>พื้นอะไรก็ได้</DropdownItem>
                  <DropdownItem>พื้นหินแกรนิต</DropdownItem>
                  <DropdownItem>พื้นคอนกรีต</DropdownItem>
                  <DropdownItem>พื้นทราย</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Row>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
