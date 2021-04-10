import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    CustomInput,
    FormGroup,
    Label,
    Input,
    FormText,
} from "reactstrap";

export default function InformationForm() {
    return (
        <div>
            <Container fluid="sm" style={{ maxWidth: "60%", minWidth: "300px" }}>
                <br />
                <Row>
                    <Col>
                        <FormGroup style={{ minWidth: "250px" }}>

                            <Input type="text" name="Name" placeholder="ชื่อ" />
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>

                            <Input type="text" name="Name" placeholder="นามสกุล" />
                        </FormGroup>
                    </Col>
                </Row>


                <FormGroup>

                    <Input type="text" name="Tel" placeholder="หมายเลขโทรศัพท์มือถือ" />
                </FormGroup>


                <FormGroup>
                    <Label ></Label>
                    <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="อีเมล"
                    />
                </FormGroup>
                <FormGroup>

                    <Input
                        type="text"
                        name="username"
                        id="exampleusername"
                        placeholder="ชื่อผู้ใช้งาน"
                    />
                </FormGroup>
                <FormGroup>

                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="รหัสผ่าน "
                    />
                </FormGroup>

                <FormGroup>

                    <Input
                        type="password"
                        name="againPassword"
                        placeholder="รหัสผ่านอีกครั้ง "
                    />
                </FormGroup>
                <FormGroup>
                    <Label >วัน/เดือน/ปีเกิด</Label>
                    <Input
                        type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="วัน/เดือน/ปี"
                    />
                </FormGroup>
                <FormGroup>
                    <Label >เพศ</Label>
                    <div>
                        <Row>
                            <Col>
                                <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="ชาย" />
                            </Col>
                            <Col>
                                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="หญิง" />
                            </Col>
                            <Col style={{minWidth:"100px"}}>
                                <CustomInput type="radio" id="exampleCustomRadio3" name="customRadio" label="ไม่ระบุเพศ" />
                            </Col>
                        </Row>




                    </div>
                </FormGroup>
                <FormGroup>

                    <Input
                        type="text"
                        name="Address"
                        id="exampleusername"
                        placeholder="ที่อยู่"
                    />
                </FormGroup>
                <FormGroup>
                    <Button>ถัดไป</Button>
                </FormGroup>
            </Container>
        </div>
    )
}
