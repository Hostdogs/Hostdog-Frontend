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
    UncontrolledPopover,
    PopoverBody,
    InputGroupAddon,
    InputGroupText,
    InputGroup
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHome} from "@fortawesome/free-solid-svg-icons"
import {fas} from "@fortawesome/fontawesome-svg-core"
import moment from 'moment-timezone'
export default function InformationForm() {

    const [repassword, setrepassword] = useState("")

    const [Information, setInformation] = useState({
        "is_host": false,
        "first_name": "",
        "last_name": "",
        "username": "",
        "email": "",
        "password": "",
        "dob": "",
        "mobile": "",
        "address": "",
        "gender": "",
    })


    const dayformat = "YYYY-MM-DD"

    const onSubmit = () => {
        console.log(Information)
    }
    const onChangeInformation = (e) => {

        const name = e.target.name
        const value = e.target.value

        Information[name] = value
        console.log(Information)

    }

    useEffect(() => {

        // setdob(moment(moment().year() - 18 + "-01-01", dayformat).format(dayformat))
        setInformation(Object.assign({}, Information, { "dob": moment(moment().year() - 18 + "-01-01", dayformat).format(dayformat) }))


    }, [])



    return (
        <div>
            <Container fluid="sm" style={{ maxWidth: "60%", minWidth: "300px" }}>
                <br />
                <Row>
                    <Col>
                        <FormGroup style={{ minWidth: "250px" }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >ชื่อ</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="first_name" placeholder="ชื่อ" onChange={onChangeInformation} />
                            </InputGroup>


                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup style={{ minWidth: "250px" }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText >นามสกุล</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="last_name" placeholder="นามสกุล" onChange={onChangeInformation} />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>


                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText >มือถือ</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="mobile" placeholder="หมายเลขโทรศัพท์มือถือ" onChange={onChangeInformation} />
                    </InputGroup>

                </FormGroup>


                <FormGroup>
                    <Label ></Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>อีเมล</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="email"
                            name="email"
                            placeholder="อีเมล"
                            onChange={onChangeInformation}
                        />
                    </InputGroup>

                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText >ชื่อผู้ใช้</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="username"
                            placeholder="ชื่อผู้ใช้งาน"
                            id="username"
                            onChange={onChangeInformation}
                        />
                    </InputGroup>

                </FormGroup>
                <FormGroup>

                    <Input
                        type="password"
                        name="password"
                        placeholder="รหัสผ่าน "
                        onChange={onChangeInformation}
                    />
                </FormGroup>

                <FormGroup>

                    <Input
                        type="password"
                        name="Repassword"
                        placeholder="รหัสผ่านอีกครั้ง "
                        onChange={e => setrepassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label >วัน/เดือน/ปีเกิด</Label>
                    <Input
                        type="date"
                        name="dob"
                        placeholder="วัน/เดือน/ปี"
                        value={Information["dob"]}
                        onChange={e => setInformation(Object.assign({}, Information, { "dob": e.target.value }))}
                        max={moment().format(dayformat)}
                        onChange={onChangeInformation}
                    />
                </FormGroup>
                <FormGroup>
                    <Label >เพศ</Label>
                    <div>
                        <Row>
                            <Col>
                                <CustomInput type="radio" id="exampleCustomRadio" name="gender" label="ชาย" onChange={onChangeInformation} value="Male" />
                            </Col>
                            <Col>
                                <CustomInput type="radio" id="exampleCustomRadio2" name="gender" label="หญิง" onChange={onChangeInformation} value="Female" />
                            </Col>
                            <Col style={{ minWidth: "100px" }}>
                                <CustomInput type="radio" id="exampleCustomRadio3" name="gender" label="ไม่ระบุเพศ" onChange={onChangeInformation} value="" />
                            </Col>
                        </Row>

                    </div>
                </FormGroup>
                <FormGroup>

                    <Input
                        type="text"
                        name="address"
                        id="exampleusername"
                        placeholder="ที่อยู่"
                        onChange={onChangeInformation}
                    />
                </FormGroup>
                <FormGroup>
                    <Button onClick={onSubmit}>ถัดไป</Button>
                </FormGroup>
            </Container>

            <UncontrolledPopover trigger="focus" placement="right" target="username">
                <PopoverBody className="Popover" style={{ maxWidth: "150px" }}>ตัวอักษรภาษาหรือตัวเลขตั้งแต่5ถึง20ตัว</PopoverBody>
            </UncontrolledPopover>
        </div>
    )
}
