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


export default function NameSetting({setSelected,Selected}) {

    const [FakeData, setFakeData] = useState({ Name: "สวัสดี", Surname: "ท่านสมาชิก" })
    const [Name, setName] = useState(FakeData.Name);
    const [Surname, setSurname] = useState(FakeData.Surname);
    const Reset = () => {
        setName(FakeData.Name)
        setSurname(FakeData.Surname)
        setSelected(0)
    }

    const infoSet = (e) => {
        e.preventDefault()
        FakeData.Name = Name
        FakeData.Surname = Surname
        //////////////will implement to refresh page////////////
        setSelected(0)
    }

    return (
        <div>

            {/*////////////////////////// Name Setting Part///////////////////////////////*/}
            <a
                onClick={e=>setSelected(1)}
                style={{
                    
                    padding: "0px",
                    zIndex: "1001"
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
                        <a>ชื่อ</a> <a style={{ marginLeft: "5%" }}>{FakeData.Name}</a>{" "}
                        <a style={{ marginLeft: "5px" }}>{FakeData.Surname}</a>
                        <a href="##" style={{ float: "right", color: "black" }}>แก้ไข</a>

                    </h6>
                </ListGroupItem>
            </a>
            

            <Collapse isOpen={Selected===1}>
                <Form onSubmit={infoSet} >
                    <br/>
                    <ListGroupItem
                        style={{
                            borderColor: "#f9ad6a",
                            borderLeft: "0px",
                            borderRight: "0px",
                            borderTop: "0px",
                            borderWidth: "3px",
                            justifyContent: "center"
                        }}
                    >
                        <InputGroup style={{ justifyContent: "center" }}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText
                                    style={{
                                        backgroundColor: "#f9e07f",
                                        color: "black",
                                        width: "80px",
                                        justifyContent: "center"
                                    }}
                                >

                                    ชื่อ
                  </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={(e) => setName(e.target.value)} value={Name} style={{ minWidth: "150px", maxWidth: "30vw" }}></Input>
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
                                        width: "80px",
                                        justifyContent: "center"
                                    }}
                                >
                                    นามสกุล
                  </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={(e) => setSurname(e.target.value)} value={Surname} style={{ minWidth: "150px", maxWidth: "30vw" }}></Input>
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
