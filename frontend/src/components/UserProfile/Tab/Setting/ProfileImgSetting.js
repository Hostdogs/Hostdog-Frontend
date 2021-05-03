import React, { useState, useEffect } from "react";
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
import { useCookies } from "react-cookie";
import HostAPI from "../../../API/HostAPI";
import CustomerAPI from "../../../API/CustomerAPI";
export default function ProfileimgPathSetting({
  setSelected,
  Selected,
  Account,
  setAccount,
}) {
  const [Image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];
  const Reset = () => {
    setImage("");
    setPreview(null);
    setSelected(0);
  };

  function onSubmit(event) {
    event.preventDefault();
    if (Image !== "" && Image !== null && Image !== undefined) {
      let form_data = new FormData();
      form_data.append("picture", Image, Image.name);
      console.log(form_data);
      if (Account.is_host) {
        HostAPI.AddHostImg(myToken, myId, form_data).then((response) => {
          console.log(response.data.picture);
          setAccount({
            ...Account,
            host: { ...Account.host, picture: response.data.picture },
          });
        });
      } else {
        CustomerAPI.AddCustomerImg(myToken, myId, form_data).then(
          (response) => {
            setAccount({
              ...Account,
              customer: {
                ...Account.customer,
                picture: response.data.picture,
              },
            });
          }
        );
      }
    }
    Reset();
  }

  function onImgChange(event) {
    if (event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  }

  return (
    <div>
      {/*////////////////////////// imgPath Setting Part///////////////////////////////*/}
      <a
        onClick={(e) => setSelected(4)}
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
            <a>รูปประจำตัว</a>

            <a href="##" style={{ float: "right", color: "black" }}>
              แก้ไข
            </a>
          </h6>
        </ListGroupItem>
      </a>

      <Collapse isOpen={Selected === 4}>
        <Form onSubmit={onSubmit}>
          <ListGroupItem
            style={{
              justifyContent: "center",
            }}
          >
            <br />
            <Container style={{ maxWidth: "" }}>
              {preview ? (
                <img
                  style={{
                    width: "300px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  src={preview}
                />
              ) : null}

              <FormGroup>
                <Label for="exampleFile">เปลี่ยนรูปโปรไฟล์ผู้ใช้ของคุณ</Label>
                <Input
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={onImgChange}
                />
                <FormText color="muted">
                  This is some placeholder block-level help text for the above
                  input. It's a bit lighter and easily wraps to a new line.
                </FormText>
              </FormGroup>
              <FormGroup tag="fieldset"></FormGroup>
            </Container>

            <div style={{ marginTop: "1%", textAlign: "right" }}>
              <Button
                style={{
                  marginRight: "1%",
                  border: "0px",
                  backgroundColor: "#f9e07f",
                  color: "black",
                }}
                onClick={onSubmit}
                type="submit"
              >
                ยืนยัน
              </Button>
              <Button
                style={{
                  marginRight: "0.5%",
                  border: "0px",
                  backgroundColor: "grey",
                }}
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
  );
}
