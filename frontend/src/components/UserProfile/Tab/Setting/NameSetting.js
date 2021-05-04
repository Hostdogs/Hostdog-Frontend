import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
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
export default function NameSetting({
  setSelected,
  Selected,
  Account,
  setAccount,
}) {
  let history = useHistory();
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
  // const [FakeData, setFakeData] = useState({ Name: "สวัสดี", lastName: "ท่านสมาชิก" })
  const [showName, setshowName] = useState();
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();

  const inputtfirstName = /^[ก-ฮะ-ไ่้๊๋็์ัํ]+$/;
  const inputlastName = /^[ก-ฮะ-ไ่้๊๋็์ัํ ]+$/;

  const onChangefirstName = (e) => {
    if (e.target.value === "" || inputtfirstName.test(e.target.value)) {
      setfirstName(e.target.value);
    }
  };

  const onChangelastName = (e) => {
    if (e.target.value === "" || inputlastName.test(e.target.value)) {
      setlastName(e.target.value);
    }
  };

  useEffect(() => {
    if (Account) {
      if (Account.is_host) {
        setfirstName(Account.host.first_name);
        setlastName(Account.host.last_name);
        setshowName(Account.host.first_name + " " + Account.host.last_name);
      } else {
        setfirstName(Account.customer.first_name);
        setlastName(Account.customer.last_name);
        setshowName(
          Account.customer.first_name + " " + Account.customer.last_name
        );
      }
    }
  }, [Account]);
  const Reset = () => {
    if (Account.is_host) {
      setfirstName(Account.host.first_name);
      setlastName(Account.host.last_name);
    } else {
      setfirstName(Account.customer.first_name);
      setlastName(Account.customer.last_name);
    }
  };

  const infoSet = (e) => {
    e.preventDefault();
    const data = { first_name: firstName, last_name: lastName };
    if (Account.is_host) {
      HostAPI.setHostInfo(cookies["mytoken"], Account.id, data).then((res) => {
        setAccount({
          ...Account,
          host: {
            ...Account.host,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
          },
        });
      });
    } else {
      CustomerAPI.setCustomerInfo(cookies["mytoken"], Account.id, data).then(
        (res) => {
          setAccount({
            ...Account,
            customer: {
              ...Account.customer,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
            },
          });
        }
      );
    }
    // history.go(0)
    //////////////will implement to refresh page////////////
    setSelected(0);
  };

  return (
    <div>
      {/*////////////////////////// Name Setting Part///////////////////////////////*/}
      <a
        onClick={(e) => setSelected(1)}
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
            <a>ชื่อ</a> <a style={{ marginLeft: "5%" }}>{showName}</a>{" "}
            <a style={{ marginLeft: "5px" }}>{}</a>
            <a href="##" style={{ float: "right", color: "black" }}>
              แก้ไข
            </a>
          </h6>
        </ListGroupItem>
      </a>

      <Collapse isOpen={Selected === 1}>
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
                    width: "80px",
                    justifyContent: "center",
                  }}
                >
                  ชื่อ
                </InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={onChangefirstName}
                value={firstName}
                style={{ minWidth: "150px", maxWidth: "30vw" }}
              ></Input>
            </InputGroup>

            <InputGroup
              style={{
                marginTop: "1%",
                justifyContent: "center",
              }}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText
                  style={{
                    backgroundColor: "#f9e07f",
                    color: "black",
                    width: "80px",
                    justifyContent: "center",
                  }}
                >
                  นามสกุล
                </InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={onChangelastName}
                value={lastName}
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
