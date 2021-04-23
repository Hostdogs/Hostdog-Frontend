import React, { useState } from 'react'
import {
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ListGroup,
    ListGroupItem,
    Button,
    Collapse,
    Form,
} from "reactstrap";


export default function PasswordSetting({ setSelected, Selected }) {
    ////////implement fake password getter/////////////////
    const [FakeData, setFakeData] = useState({ Password: "kuypholinwza" })


    const [oldPassword, setoldPassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const Reset = () => {
        setoldPassword("")
        setnewPassword("")
        setconfirmPassword("")
        setSelected(0)
    }

    const infoSet = (e) => {
        e.preventDefault()
        FakeData.Password = newPassword

        //////////////will implement to refresh page////////////
        setSelected(0)
    }

    return (
        <div>

            {/*////////////////////////// Name Setting Part///////////////////////////////*/}
            <a
                onClick={e => setSelected(2)}
                style={{
                   
                    padding: "0px",

                }}
            >
                <ListGroupItem
                    style={{
                        backgroundColor: "#f9e07f",
                        border: "0px",
                        textAlign: "left",
                        color: "black",
                    }}
                >
                    <h6>
                        <a>รหัสผ่าน</a>
                        <a style={{ marginLeft: "5px" }}>{FakeData.Surname}</a>
                        <a href="##" style={{ float: "right", color: "black" }}>แก้ไข</a>

                    </h6>
                </ListGroupItem>
            </a>


            <Collapse isOpen={Selected === 2}>
                <Form onSubmit={infoSet} >

                    <ListGroupItem
                        style={{
                            justifyContent: "center"
                        }}
                    >
                        <br />
                        <InputGroup style={{ justifyContent: "center" }}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText
                                    style={{
                                        backgroundColor: "#f9e07f",
                                        color: "black",
                                        width: "120px",
                                        justifyContent: "center"
                                    }}
                                >

                                    พาสเวิร์ดเดิม
                  </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={(e) => setoldPassword(e.target.value)} value={oldPassword} style={{ minWidth: "150px", maxWidth: "30vw" }} type="password"></Input>
                        </InputGroup>

                        <InputGroup
                            style={{
                                marginTop: "1%",
                                justifyContent: "center"
                            }}
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText
                                    style={{
                                        backgroundColor: "#f9e07f",
                                        color: "black",
                                        width: "120px",
                                        justifyContent: "center"
                                    }}
                                >
                                    พาสเวิร์ดใหม่
                  </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={(e) => setnewPassword(e.target.value)} value={newPassword} style={{ minWidth: "150px", maxWidth: "30vw" }} type="password"></Input>
                        </InputGroup>
                        <InputGroup
                            style={{
                                marginTop: "1%",
                                justifyContent: "center"
                            }}
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText
                                    style={{
                                        backgroundColor: "#f9e07f",
                                        color: "black",
                                        width: "120px",
                                        justifyContent: "center"
                                    }}
                                >
                                    พาสเวิร์ดอีกครั้ง
                  </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword} style={{ minWidth: "150px", maxWidth: "30vw" }} type="password"></Input>
                        </InputGroup>

                        <div style={{ marginTop: "1%", textAlign: "right" }}>
                            <Button
                                style={{ marginRight: "1%", border: "0px", backgroundColor: "#f9e07f", color: "black" }}
                                onClick={infoSet} type="submit"
                            >
                                ยืนยัน
                </Button>
                            <Button
                                style={{ marginRight: "0.5%", border: "0px", backgroundColor: "grey" }}
                                onClick={Reset}
                                type="reset"
                            >
                                ยกเลิก
                </Button>


                        </div>
                    </ListGroupItem>
                </Form>
            </Collapse>
        </div>
    )
}
