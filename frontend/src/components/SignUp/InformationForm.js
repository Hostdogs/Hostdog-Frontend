import React, { useState, useEffect } from "react";
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
  FormFeedback
} from "reactstrap";
import moment from 'moment-timezone'
export default function InformationForm() {
    const [birthDate, setbirthDate] = useState("")
    const dayformat = "YYYY-MM-DD"
    const onSubmit = () =>{
        console.log(moment().year()-18)
        console.log(birthDate)
    }

    useEffect(() => {
        
        setbirthDate(moment(moment().year()-18+"-01-01",dayformat).format(dayformat))
       
  
    }, [])

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
                        <FormGroup style={{ minWidth: "250px" }}>

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
                        placeholder="อีเมล"
                    />
                </FormGroup>
                <FormGroup>

                    <Input
                        type="text"
                        name="username"
                        placeholder="ชื่อผู้ใช้งาน"
                    />
                </FormGroup>
                <FormGroup>

                    <Input
                        type="password"
                        name="password"
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
                        placeholder="วัน/เดือน/ปี"
                        value={birthDate}
                        onChange={ e=> setbirthDate(e.target.value)}
                        max={moment().format(dayformat)}
                        
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
                            <Col style={{ minWidth: "100px" }}>
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
                    <Button onClick={onSubmit}>ถัดไป</Button>
                </FormGroup>
            </Container>
        </div>
    )
}
