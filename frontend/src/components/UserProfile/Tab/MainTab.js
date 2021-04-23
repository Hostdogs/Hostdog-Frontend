import React,{useState} from 'react'
import { CardFooter, CardText, CardTitle, Alert, Container, Label, Input, Button } from 'reactstrap'

const MainTab = () => {
  const [Description, setDescription] = useState("aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis")
  const [editable, seteditable] = useState(true)
  const editDescription = (e) =>{
    if(editable){
      setDescription(e.target.value)
    }
  }
  // const handleFocusDescription = () =>{
  //   setbtnShow(true)
  // }
  // const handleBlurDescription = () =>{
  //   setbtnShow(false)
  // }
  const onSetDescription = () =>{
    console.log(Description)
    ////////////function => post to backend////////
  }


  return (
    <div>
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
          <Container style={{paddingLeft:"20px",paddingRight:"20px"}} >
            <Input type="textarea" style={{maxWidth:"100%",overflowWrap:"break-word",height:"50vh"}} value={Description} 
            onChange={
              editDescription
              } />
            {editable? (
              <Button onClick={onSetDescription} >แก้ไข</Button>
            ):(null)}
            {/* style={{position:"relative",top:"-40px",float:"right",marginRight:"15px",marginTop:"-5px",backgroundColor:"rgba(212,108,78,0.75)",borderWidth:"0px",color:"#264d59"}} */}
              
           
              
          </Container>
        </CardText>
      </CardFooter>
    </div>

  )
}

export default MainTab
