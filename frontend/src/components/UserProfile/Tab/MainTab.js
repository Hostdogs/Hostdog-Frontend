import React, { useEffect, useState } from 'react'
import { CardFooter, CardText, CardTitle, Alert, Container, Label, Input, Button } from 'reactstrap'
import moment from 'moment-timezone'
import 'moment/locale/th';
const MainTab = ({ isOwned, isCustomer,Profile }) => {
 
  const [Description, setDescription] = useState("")
  const [dateJoin, setdateJoin] = useState("")
  const [lastLogin, setlastLogin] = useState("")
  const [age, setage] = useState("")
  const [gender, setgender] = useState("")

  const editDescription = (e) => {
    if (isOwned) {
      setDescription(e.target.value)
    }
  }
  
  useEffect(() => {
    moment.updateLocale("th")

    console.log("ingerit profile",Profile,moment.locale())
    if(isCustomer){
      setDescription(Profile.customer_bio)
    }else{
      setDescription(Profile.host_bio)
    }
    if(Profile.gender==="male"){
      setgender("ชาย")
    }else if(Profile.gender==="female"){
      setgender("หญิง")
    }else{
      setgender("ไม่ระบุ")
    }
    setage(moment().diff(moment(Profile.dob),"years"))
    setdateJoin(moment(Profile.date_joined).format("L"))
    setlastLogin(moment(Profile.last_login).fromNow())
    // console.log(moment(new Date("2021-04-20 22:57:36")).format("YYYY-MM-DD HH:mm:ss"))
    // console.log(moment().fromNow())
  }, [isOwned, isCustomer,Profile])

  const onSetDescription = () => {
    console.log(Description)
    ////////////function => post to backend////////
  }


  return (
    <div>
      <CardFooter style={{ height: "70%" }}>
        <br />
        <CardText style={{ textAlign: "left" }}>
          <CardTitle tag="h5">รายละเอียด</CardTitle>
          {isCustomer ? (
            <ul>
              <li>เพศ {gender} อายุ {age} ปี</li>
              <li>มีสุนัขในโปรไฟล์ 0 ตัว</li>
              <li>เริ่มใช้งานเมื่อวันที่ {dateJoin}</li>
              <li>ออนไลน์ล่าสุด {lastLogin}</li>
              
            </ul>
          ) : (
            <ul>
              <li>เพศ {gender} อายุ {age} ปี</li>
              <li>รับเลี้ยงสุนัขมาแล้ว 0 ตัว</li>
              <li>เริ่มใช้งานตั้งแต่ {dateJoin}</li>
              <li>ออนไลน์ล่าสุด {lastLogin}</li>
              
            </ul>
          )}

          <CardTitle tag="h5">คำอธิบาย</CardTitle>
          <Container style={{ paddingLeft: "20px", paddingRight: "20px" }} >
            <Input type="textarea" style={{ maxWidth: "100%", overflowWrap: "break-word", height: "50vh" }} value={Description}
              onChange={
                editDescription
              } />
            {isOwned ? (
              <Button onClick={onSetDescription} >แก้ไข</Button>
            ) : (null)}
            {/* style={{position:"relative",top:"-40px",float:"right",marginRight:"15px",marginTop:"-5px",backgroundColor:"rgba(212,108,78,0.75)",borderWidth:"0px",color:"#264d59"}} */}



          </Container>
        </CardText>
      </CardFooter>
    </div>

  )
}

export default MainTab
