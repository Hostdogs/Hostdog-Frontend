import React from 'react'
import { CardFooter, CardText, CardTitle, Alert} from 'reactstrap'


const MainTab = () => {
    return (
        <CardFooter style={{ height: "70%" }}>
        <br />
        <CardText style={{ textAlign: "left" }}>
          <CardTitle tag="h5">รายละเอียด</CardTitle>
            <ul>
              <li>เริ่มใช้งานตั้งแต่ 31/02/64</li>
              <li>ออนไลน์ล่าสุด x ช.ม.</li>
              <li>มีสุนัขทั้งหมด x ตัว</li>
            </ul>
          <CardTitle tag="h5">คำอธิบาย</CardTitle>
          <Alert color="warning">
            <div>
              บาสนั่งตกปลาอยู่ริมตลิ่งที่บางขุนเทียน
              ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </div>
          </Alert>
        </CardText>
      </CardFooter>
    )
}

export default MainTab
