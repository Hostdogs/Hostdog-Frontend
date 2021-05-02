import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
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
import AuthenAPI from '../../../API/AuthenAPI';


export default function PasswordSetting({ setSelected, Selected,Account }) {
    ////////implement fake password getter/////////////////

    const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
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
        if(newPassword===confirmPassword){
            AuthenAPI.changePassword(cookies["mytoken"], Account.id,oldPassword,newPassword).then(res=>{
                console.log("password Changed")
                Reset()
            }).catch(err=>{
                console.log(err.response)
            })
        }

        //////////////will implement to refresh page////////////
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
                        <a style={{ marginLeft: "5px" }}></a>
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

                                    รหัสผ่านเดิม
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
                                    รหัสผ่านใหม่
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
                                    รหัสผ่านอีกครั้ง
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
