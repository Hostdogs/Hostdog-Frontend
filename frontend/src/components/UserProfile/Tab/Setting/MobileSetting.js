import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
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
import CustomerAPI from "../../../API/CustomerAPI";
import HostAPI from "../../../API/HostAPI";

export default function MobileSetting({ setSelected, Selected, Account }) {
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  // const [FakeData, setFakeData] = useState({ Mobile: "0810855513" })
  const [Mobile, setMobile] = useState();
  const [showMobile, setshowMobile] = useState();

  const inputMobile = /^[0-9\b]+$/;

  const onChangeMobile = (e) => {
    if (e.target.value === "" || inputMobile.test(e.target.value)) {
      setMobile(e.target.value);
    }
  };

  useEffect(() => {
    if (Account) {
      if (Account.is_host) {
        setMobile(Account.host.mobile);
        setshowMobile(Account.host.mobile);
      } else {
        setMobile(Account.customer.mobile);
        setshowMobile(Account.customer.mobile);
      }
    }
  }, [Account]);

  const infoSet = (e) => {
    e.preventDefault();
    const data = { mobile: Mobile };
    if (Account.is_host) {
      HostAPI.setHostInfo(cookies["mytoken"], Account.id, data).then((res) => {
        setshowMobile(res.data.mobile);
      });
    } else {
      CustomerAPI.setCustomerInfo(cookies["mytoken"], Account.id, data).then(
        (res) => {
          setshowMobile(res.data.mobile);
        }
      );
    }
    //////////////will implement to refresh page////////////
    setSelected(0);
  };

  const Reset = () => {
    setMobile(showMobile);
  };

  return (
    <div>
      {/*////////////////////////// Mobile Setting Part///////////////////////////////*/}
      <a
        onClick={(e) => setSelected(3)}
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
            <a>เบอร์โทรศัพท์</a>{" "}
            <a style={{ marginLeft: "5%" }}>{showMobile}</a>{" "}
            <a href="##" style={{ float: "right", color: "black" }}>
              แก้ไข
            </a>
          </h6>
        </ListGroupItem>
      </a>

      <Collapse isOpen={Selected === 3}>
        <Form onSubmit={infoSet}>
          <ListGroupItem
            style={{
              justifyContent: "center",
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
                    justifyContent: "center",
                  }}
                >
                  เบอร์โทรศัพท์
                </InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={onChangeMobile}
                maxLength="10"
                value={Mobile}
                style={{ minWidth: "150px", maxWidth: "30vw" }}
              ></Input>
            </InputGroup>

            <div style={{ marginTop: "1%", textAlign: "right" }}>
              <Button
                style={{
                  marginRight: "1%",
                  border: "0px",
                  backgroundColor: "#f9e07f",
                  color: "black",
                }}
                onClick={infoSet}
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
