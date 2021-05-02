import React, { useEffect, useState } from 'react'
import { CardFooter, CardText, CardTitle, Alert, Container, Label, Input, Button } from 'reactstrap'
import moment from 'moment-timezone'
import 'moment/locale/th';
import Skeleton from 'react-loading-skeleton'
import HostAPI from '../../API/HostAPI';
import CustomerAPI from '../../API/CustomerAPI';
import { useCookies } from "react-cookie";
const MainTab = ({ isOwned, isCustomer, Account }) => {
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"])
  const [Description, setDescription] = useState("")
  const [dateJoin, setdateJoin] = useState("")
  const [lastLogin, setlastLogin] = useState("")
  const [age, setage] = useState("")
  const [gender, setgender] = useState("")
  const [isLoad, setisLoad] = useState(false)
  const editDescription = (e) => {
    if (isOwned) {
      setDescription(e.target.value)
    }
  }
  const [isEdit, setisEdit] = useState(false)
  useEffect(() => {
    moment.updateLocale("th")
    if (Account) {
      console.log("inherited profile", Account, moment.locale())
      let roledata = ""
      if (Account.is_host) {
        roledata = "host"
        setDescription(Account.host.host_bio)
      } else {
        roledata = "customer"
        setDescription(Account.customer.customer_bio)
      }
      if (Account[roledata].gender === "male") {
        setgender("ชาย")
      } else if (Account[roledata].gender === "female") {
        setgender("หญิง")
      } else {
        setgender("ไม่ระบุ")
      }
      setage(moment().diff(moment(Account[roledata].dob), "years"))
      setdateJoin(moment(Account[roledata].date_joined).format("L"))
      setlastLogin(moment(Account[roledata].last_login).fromNow())
      // console.log(moment(new Date("2021-04-20 22:57:36")).format("YYYY-MM-DD HH:mm:ss"))
      // console.log(moment().fromNow())
      setisLoad(true)
    }

  }, [Account])

  const onSetDescription = () => {
    console.log(Description)
    
    ////////////function => post to backend////////
    if(Account.is_host){
      const data = {host_bio:Description}
      HostAPI.setHostInfo(cookies["mytoken"], Account.id,data).then(res=>{
        console.log(res)
      })
    }else{
      const data = {customer_bio:Description}
      CustomerAPI.setCustomerInfo(cookies["mytoken"],Account.id,data).then(res=>{
        console.log(res)
      })
    }
  }


  return (
    <div>
      <CardFooter style={{ height: "70%" }}>
        <br />
        <CardText style={{ textAlign: "left" }}>
          <CardTitle tag="h5">รายละเอียด</CardTitle>
          {isLoad ? (null):(<Skeleton count={4}/>)}
          {isCustomer&&isLoad ? (
            <ul>
              <li>เพศ {gender} อายุ {age} ปี</li>
              <li>มีสุนัขในโปรไฟล์ 0 ตัว</li>
              <li>เริ่มใช้งานเมื่อวันที่ {dateJoin}</li>
              <li>ล็อกอินครั้งล่าสุด {lastLogin}</li>

            </ul>
          ) : (null)}

          {!isCustomer&&isLoad ?(
            <ul>
              <li>เพศ {gender} อายุ {age} ปี</li>
              <li>รับเลี้ยงสุนัขมาแล้ว 0 ตัว</li>
              <li>เริ่มใช้งานตั้งแต่ {dateJoin}</li>
              <li>ล็อกอินครั้งล่าสุด {lastLogin}</li>
            </ul>
          ):(null)}


          <CardTitle tag="h5">คำอธิบาย</CardTitle>
          <Container style={{ paddingLeft: "20px", paddingRight: "20px" }} >
            <Input type="textarea" style={{ maxWidth: "100%", overflowWrap: "break-word", height: "50vh" }} value={Description}
              onChange={
                editDescription
              } />
            {isOwned&&isEdit ? (<div>
              <Button onClick={onSetDescription} >แก้ไข</Button><Button>ยกเลิก</Button>
            </div>
              
            ) : (" ")}
            {/* style={{position:"relative",top:"-40px",float:"right",marginRight:"15px",marginTop:"-5px",backgroundColor:"rgba(212,108,78,0.75)",borderWidth:"0px",color:"#264d59"}} */}



          </Container>
        </CardText>
      </CardFooter>
    </div>

  )
}

export default MainTab
