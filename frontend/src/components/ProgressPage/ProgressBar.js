import { Container, Label, Row, Col, Progress, Button } from "reactstrap";
import "./ProgressPage.css";
import React, { useState,useEffect } from "react";
import ServiceDetail from './ServiceDetail'
const progressLabel = [
  "ถึงเวลาบริการแล้วครับ ย้าฮูว...",
  "ผู้รับฝากกำลังรอรับสุนัขของคุณครับ",
  "กำลังดูแลสุนัขของคุณครับ",
  "ครบกำหนดแล้วกรุณามารับสุนัขของคุณได้ครับ",
  "บริการสำเร็จแล้วครับ",
  "คุณได้ยกเลิกบริการแล้วครับ",
  "",
];
const color = [ "warning", "info", "","success" ,"danger"];
export default function ProgressBar({onCancel}) {
  const [progressValue, setProgressValue] = useState(0);

  const [colorIndex, setColorIndex] = useState(0);

  const [labelIndex, setLabelIndex] = useState(0);
  
  const [imageSize,setImageSize] =useState({
      height:100,width:80
  })

  const handleProgress = () => {
    console.log(colorIndex );
    if (progressValue >= 100) {
      setLabelIndex(0);
      setProgressValue(20);
      setColorIndex(0);
      setImageSize({height:100,width:80});
    } else {
      setLabelIndex(labelIndex + 1);
      setColorIndex(colorIndex + 1);
      setProgressValue(progressValue + 20);
      setImageSize({height:imageSize.height*2,width:imageSize.width*2});
      if (progressValue === 20) {
        setColorIndex(0);

      }
    }
  };
  const handleCancel=()=>{
    setProgressValue(100);
    setColorIndex(4);
    setLabelIndex(5);
  }
  useEffect(() => {
    setProgressValue(progressValue + 20);
  },[]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Container className="progressbar-container">
          <Container>
      <img src={process.env.PUBLIC_URL + '/doge.png'} width={imageSize.width.toString()} height= {imageSize.height.toString()}/>
      </Container>
        <h2>{progressLabel[labelIndex]}</h2>
        <Progress color={color[colorIndex]} value={progressValue} />
        <Button onClick={handleProgress} >Progress</Button>
        
      </Container>

    <ServiceDetail onCancel={handleCancel}/>
    </div>
  );
}
