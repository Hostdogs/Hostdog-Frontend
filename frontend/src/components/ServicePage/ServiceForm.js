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
            <h2>เลือกบริการของคุณ</h2>
          </FormGroup>
          <div className="list-service">
            <FormGroup>
              <Row>
                <Col xs="5">เลือกสุนัขของคุณ</Col>
                <Col>
                  <Button color="primary">เลือก</Button>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="5">ผู้รับฝาก</Col>
                <Col>นายคำนวย บางขุนเทียน</Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="5">ประเภทการฝาก</Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="DeTypeRadio"
                    name="DeTypeRadio"
                    label="ฝากระหว่างวัน"
                  />
                </Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="DeTypeRadio2"
                    name="DeTypeRadio"
                    label="ฝากระหว่างวัน"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="5">วันที่ใช้บริการฝาก</Col>
                <Col xs="3">
                  <Input type="date" name="start-service" />
                </Col>
                <Col xs="3">
                  <Input type="date" name="end-service" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="5">ประเภทอาหาร</Col>
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
                <Col xs="5">ความถี่ในการให้อาหาร</Col>
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
                <Col xs="5">ปริมาณอาหารต่อวัน</Col>
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
            <FormGroup>
              <Row>
                <Col xs="5">พาไปสุนัขเดินเล่น</Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="walkRadio"
                    name="walkRadio"
                    label="ต้องการ"
                  />
                </Col>
                <Col>
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
                <Col xs="5">ให้ผู้รับฝากไปรับสุนัข</Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="getDogRadio"
                    name="gerDogRadio"
                    label="ต้องการ"
                  />
                </Col>
                <Col>
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
                <Col xs="5">ให้ผู้รับฝากไปส่งสุนัข</Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="sendDogRadio"
                    name="sendDogRadio"
                    label="ต้องการ"
                  />
                </Col>
                <Col>
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
                <Col xs="5">อาบน้ำสุนัข</Col>
                <Col>
                  <CustomInput
                    type="radio"
                    id="bathDogRadio"
                    name="bathDogRadio"
                    label="ต้องการ"
                  />
                </Col>
                <Col>
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
              <h2>รายละเอียดเพิ่มเติมเพิ่มเติม</h2>
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
