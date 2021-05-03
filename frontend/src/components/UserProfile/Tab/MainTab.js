import React, { useEffect, useState } from "react";
import {
  CardFooter,
  CardText,
  CardTitle,
  Alert,
  Container,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import moment from "moment-timezone";
import "moment/locale/th";
import Skeleton from "react-loading-skeleton";
import HostAPI from "../../API/HostAPI";
import CustomerAPI from "../../API/CustomerAPI";
import { useCookies } from "react-cookie";
const MainTab = ({ isOwned, isHost, Account, dogCount, setdogCount }) => {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const [Description, setDescription] = useState("");
  const [dateJoin, setdateJoin] = useState("");
  const [lastLogin, setlastLogin] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [isLoad, setisLoad] = useState(false);
  const [isEdit, setisEdit] = useState(false);

  const [hostedCount, sethostedCount] = useState("");
  const editDescription = (e) => {
    if (Account) {
      if (isOwned) {
        setDescription(e.target.value);
        setisEdit(true);
      }
    }
  };
  const onResetDescription = (e) => {
    if (Account.is_host) {
      setDescription(Account.host.host_bio);
    } else {
      setDescription(Account.customer.customer_bio);
    }
    setisEdit(false);
  };

  // console.log(isEdit)
  useEffect(() => {
    moment.updateLocale("th");
    if (Account) {
      // console.log("inherited profile", Account, moment.locale())
      let roledata = "";
      if (Account.is_host) {
        roledata = "host";
        setDescription(Account.host.host_bio);
        sethostedCount(Account.host.host_hosted_count);
      } else {
        roledata = "customer";
        setDescription(Account.customer.customer_bio);
        setdogCount(Account.customer.customer_dog_count);
      }
      if (Account[roledata].gender === "male") {
        setgender("ชาย");
      } else if (Account[roledata].gender === "female") {
        setgender("หญิง");
      } else {
        setgender("ไม่ระบุ");
      }
      setage(moment().diff(moment(Account[roledata].dob), "years"));
      setdateJoin(moment(Account.date_joined).format("L"));
      setlastLogin(moment(Account.last_login).fromNow());
      // console.log(moment(Account.last_login))
      // console.log(moment(new Date("2021-04-20 22:57:36")).format("YYYY-MM-DD HH:mm:ss"))
      // console.log(moment().fromNow())
      setisLoad(true);
    }
  }, [Account]);

  const onSetDescription = () => {
    // console.log(Description)

    ////////////function => post to backend////////
    if (Account.is_host) {
      const data = { host_bio: Description };
      HostAPI.setHostInfo(cookies["mytoken"], Account.id, data).then((res) => {
        // console.log(res)
        Account.host.host_bio = res.data.host_bio;
      });
    } else {
      const data = { customer_bio: Description };
      CustomerAPI.setCustomerInfo(cookies["mytoken"], Account.id, data).then(
        (res) => {
          // console.log(res)
          Account.customer.customer_bio = res.data.customer_bio;
        }
      );
    }
  };

  return (
    <div style={{ backgroundColor: "", border: "0px" }}>
      <CardFooter style={{ height: "70%" }}>
        <br />
        <div style={{ textAlign: "left", color: "black" }}>
          <CardTitle tag="h5">รายละเอียด</CardTitle>
          {isLoad ? null : <Skeleton count={4} />}
          {!isHost && isLoad ? (
            <ul>
              <li>
                เพศ {gender} อายุ {age} ปี
              </li>
              <li>มีสุนัขในโปรไฟล์ {dogCount} ตัว</li>
              <li>เริ่มใช้งานเมื่อวันที่ {dateJoin}</li>
              <li>ล็อกอินครั้งล่าสุด {lastLogin}</li>
            </ul>
          ) : null}

          {isHost && isLoad ? (
            <ul>
              <li>
                เพศ {gender} อายุ {age} ปี
              </li>
              <li>รับเลี้ยงสุนัขมาแล้ว {hostedCount} ตัว</li>
              <li>เริ่มใช้งานตั้งแต่ {dateJoin}</li>
              <li>ล็อกอินครั้งล่าสุด {lastLogin}</li>
            </ul>
          ) : null}

          <CardTitle tag="h5">คำอธิบาย</CardTitle>
          <Container style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <Input
              type="textarea"
              style={{
                maxWidth: "100%",
                overflowWrap: "break-word",
                height: "50vh",
              }}
              value={Description}
              onChange={editDescription}
            />
            {isOwned && isEdit ? (
              <div style={{marginTop:"10px"}}>
                <Row>
                  <Col xs="6" style={{textAlign:"end"}}>
                    <Button color="primary" onClick={onSetDescription} style={{ border:"0px"}}>บันทึก</Button>
                  </Col>
                  <Col xs="6" style={{textAlign:"start"}}>
                    <Button type="reset" onClick={onResetDescription} style={{backgroundColor:"red", border:"0px"}}>
                      ยกเลิก
                    </Button>
                  </Col>
                </Row>
              </div>
            ) : (
              " "
            )}
            {/* style={{position:"relative",top:"-40px",float:"right",marginRight:"15px",marginTop:"-5px",backgroundColor:"rgba(212,108,78,0.75)",borderWidth:"0px",color:"#264d59"}} */}
          </Container>
        </div>
      </CardFooter>
    </div>
  );
};

export default MainTab;
