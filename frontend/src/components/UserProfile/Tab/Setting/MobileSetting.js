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


export default function MobileSetting({ setSelected, Selected }) {

    const [FakeData, setFakeData] = useState({ Mobile: "0810855513" })
    const [Mobile, setMobile] = useState(FakeData.Mobile);
    
    const Reset = () => {
        setMobile(FakeData.Mobile)
        setSelected(0)
    }

    const infoSet = (e) => {
        e.preventDefault()
        FakeData.Mobile = Mobile

        //////////////will implement to refresh page////////////
        setSelected(0)
    }

    return (
        <div>

            {/*////////////////////////// Mobile Setting Part///////////////////////////////*/}
            <a
                onClick={e => setSelected(3)}
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
                        <a>เบอร์โทรศัพท์</a> <a style={{ marginLeft: "5%" }}>{FakeData.Mobile}</a>{" "}
                        <a href="##" style={{ float: "right", color: "black" }}>แก้ไข</a>

                    </h6>
                </ListGroupItem>
            </a>


            <Collapse isOpen={Selected === 3}>
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
                                        width: "100px",
                                        justifyContent: "center"
                                    }}
                                >

                                    เบอร์โทรศัพท์
                  </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={(e) => setMobile(e.target.value)} value={Mobile} style={{ minWidth: "150px", maxWidth: "30vw" }}></Input>
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
