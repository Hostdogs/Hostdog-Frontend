import React, { useState,useEffect } from 'react'
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
    FormGroup,
    Label,
    FormText,

} from "reactstrap";


export default function ProfileimgPathSetting({ setSelected, Selected }) {

    const [FakeData, setFakeData] = useState({ imgPath: "/user_placeholder.png" })
    const [imgPath, setimgPath] = useState(FakeData.imgPath);
    const [Image, setImage] = useState("")
    const Reset = () => {
        setimgPath(FakeData.imgPath)

        setSelected(0)
    }
    useEffect(() => {
        console.log(Image)
    }, [Image])
    const infoSet = (e) => {
        e.preventDefault()
        FakeData.imgPath = imgPath

        //////////////will implement to refresh page////////////
        setSelected(0)
    }

    return (
        <div>

            {/*////////////////////////// imgPath Setting Part///////////////////////////////*/}
            <a
                onClick={e => setSelected(4)}
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
                        <a>รูปประจำตัว</a> <a style={{ marginLeft: "5%" }}>
                            {FakeData.imgPath}</a>{" "}

                        <a href="##" style={{ float: "right", color: "black" }}>แก้ไข</a>

                    </h6>
                </ListGroupItem>
            </a>


            <Collapse isOpen={Selected === 4}>
                <Form onSubmit={infoSet} >

                    <ListGroupItem
                        style={{

                            justifyContent: "center"
                        }}
                    >
                        <br />
                        <Container style={{ maxWidth: "" }}>
                            <FormGroup>
                                
                                <Label for="exampleFile">เปลี่ยนรูปโปรไฟล์ผู้ใช้ของคุณ</Label>
                                <Input type="file" name="file" id="exampleFile" accept="image/*" value={Image} onChange={e=>setImage(e.target.value)}/>
                                <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                            </FormText>
                            </FormGroup>
                            <FormGroup tag="fieldset"></FormGroup>
                        </Container>


                        {/* <InputGroup style={{ justifyContent: "center" }}>
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
                            <Input onChange={(e) => setimgPath(e.target.value)} value={imgPath} style={{ minWidth: "150px", maxWidth: "30vw" }}></Input>
                        </InputGroup> */}



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
