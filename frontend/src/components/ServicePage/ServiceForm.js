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
          <FormGroup>
            <h3>เลือกบริการของคุณ</h3>
          </FormGroup>
          <div className="list-service">
            <FormGroup>
              <Row>
                <Col xs="6" sm="4">
                  เลือกสุนัขของคุณ
                </Col>
                <Col xs="6" sm="4">
                  <Button color="primary" size="sm">
                    เลือก
                  </Button>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="4">
                  ผู้รับฝาก
                </Col>
                <Col xs="12" sm="4">
                  นายคำนวย บางขุนเทียน
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="4">
                  ประเภทการฝาก
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="DeTypeRadio"
                    name="DeTypeRadio"
                    label="ฝากระหว่างวัน"
                  />
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="DeTypeRadio2"
                    name="DeTypeRadio"
                    label="ฝากข้ามคืน"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="4">
                  วันที่ใช้บริการฝาก
                </Col>
                <Col xs="12" sm="4">
                  <Input type="date" name="start-service" />
                </Col>
                <Col xs="12" sm="4">
                  <Input type="date" name="end-service" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="4">
                  ประเภทอาหาร
                </Col>
                <Col xs="12" sm="4">
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
                <Col xs="12" sm="4">
                  ความถี่ในการให้อาหาร
                </Col>
                <Col xs="12" sm="4">
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
                <Col xs="12" sm="4">
                  ปริมาณอาหารต่อวัน
                </Col>
                <Col xs="12" sm="4">
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
            <h3>บริการเพิ่มเติม</h3>
          </FormGroup>
          <div className="list-service">
            <FormGroup>
              <Row>
                <Col xs="12" sm="4">
                  พาไปสุนัขเดินเล่น
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="walkRadio"
                    name="walkRadio"
                    label="ต้องการ"
                  />
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="walkRadio2"
                    name="walkRadio"
                    label="ไม่ต้องการ"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="4">
                  ให้ผู้รับฝากไปรับสุนัข
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="getDogRadio"
                    name="gerDogRadio"
                    label="ต้องการ"
                  />
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="getDogRadio2"
                    name="gerDogRadio"
                    label="ไม่ต้องการ"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="4">
                  ให้ผู้รับฝากไปส่งสุนัข
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="sendDogRadio"
                    name="sendDogRadio"
                    label="ต้องการ"
                  />
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="sendDogRadio2"
                    name="sendDogRadio"
                    label="ไม่ต้องการ"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="4">
                  อาบน้ำสุนัข
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="bathDogRadio"
                    name="bathDogRadio"
                    label="ต้องการ"
                  />
                </Col>
                <Col xs="6" sm="4">
                  <CustomInput
                    type="radio"
                    id="bathDogRadio2"
                    name="bathDogRadio"
                    label="ไม่ต้องการ"
                  />
                </Col>
              </Row>
            </FormGroup>
          </div>
          <FormGroup>
            <Row>
              <h3>รายละเอียดเพิ่มเติมเพิ่มเติม</h3>
              <Input
                rows="5"
                type="textarea"
                name="bio"
                placeholder="ระบุรายละเอียดเพิ่มเติม"
              />
            </Row>
            <Row></Row>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}
