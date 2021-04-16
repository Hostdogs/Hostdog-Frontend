import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./Service.css";

export default function ServiceForm() {
  const [dropdownTypeOpen, setTypeOpen] = useState(false);
  const toggleType = () => setTypeOpen(!dropdownTypeOpen);

  const [dropdownFreqOpen, setFreqOpen] = useState(false);
  const toggleFreq = () => setFreqOpen(!dropdownFreqOpen);

  const [dropdownWeightOpen, setWeightOpen] = useState(false);
  const toggleWeight = () => setWeightOpen(!dropdownWeightOpen);

  return (
    <div>
      <Container>
        <Form>
          <FormGroup className="header-service">
            <h2>เลือกบริการของคุณ</h2>
          </FormGroup>
          <div className="list-service">
            <FormGroup>
              <Row>
                <Col xs="6">เลือกสุนัขของคุณ</Col>
                <Col xs="6">
                  <Button color="primary">เลือก</Button>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>ผู้รับฝาก</Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>ประเภทการฝาก</Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="roleRadio"
                    name="roleRadio"
                    label="ฝากระหว่างวัน"
                  />
                </Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="roleRadio2"
                    name="roleRadio"
                    label="ฝากระหว่างวัน"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>วันที่ใช้บริการฝาก</Col>
                <Col>
                  <Input type="date" name="start-service" />
                </Col>
                <Col>
                  <Input type="date" name="end-service" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>ประเภทอาหาร</Col>
                <Col>
                  <ButtonDropdown isOpen={dropdownTypeOpen} toggle={toggleType}>
                    <DropdownToggle caret size="sm">
                      เลือกประเภทอาหาร
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>อาหารเปียก</DropdownItem>
                      <DropdownItem>อาหารแห้ง</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>ความถี่ในการให้อาหาร</Col>
                <Col>
                  <ButtonDropdown isOpen={dropdownFreqOpen} toggle={toggleFreq}>
                    <DropdownToggle caret size="sm">
                      เลือกความถี่ในการให้อาหาร
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>1 ครั้ง/วัน</DropdownItem>
                      <DropdownItem>2 ครั้ง/วัน</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>ปริมาณอาหารต่อวัน</Col>
                <Col>
                  <ButtonDropdown
                    isOpen={dropdownWeightOpen}
                    toggle={toggleWeight}
                  >
                    <DropdownToggle caret size="sm">
                      เลือกปริมาณอาหารต่อวัน
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>20 กรัม</DropdownItem>
                      <DropdownItem>30 กรัม</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
              </Row>
            </FormGroup>
          </div>
          <FormGroup>
            <h2>บริการเพิ่มเติม</h2>
          </FormGroup>
          <div className="list-service">
            <FormGroup>พาไปเดินเล่น</FormGroup>
            <FormGroup>ให้ผู้รับฝากไปรับสุนัข</FormGroup>
            <FormGroup>อาบน้ำ</FormGroup>
          </div>
        </Form>
      </Container>
    </div>
  );
}
