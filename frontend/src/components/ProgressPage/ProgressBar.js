import { Container, Label, Row, Col, Progress, Button } from "reactstrap";
import "./ProgressPage.css";

const progressLabel = [
  "กำลังรอคำตอบรับจากผู้รับฝาก",
  "ผู้รับฝากกำลังรอรับสุนัข",
  "กำลังรอการเริ่มบริการ",
  "กำลังดูแลสุนัข",
  "ครบกำหนดเวลาแล้ว กรุณามารับสุนัข",
  "บริการเสร็จสิ้นแล้ว",
  "บริการได้ยกเลิกแล้ว",
  "เลยเวลาบริการแล้ว",
];
const color = [ "success", "danger"];
const gif = [
  "/waiting.gif",
  "/congrat.gif",
  "/waitinghost.gif",
  "/onhost.gif",
  "/wavecall.gif",
  "/bye.gif",
  "/sad.gif",
];
export default function ProgressBar({
  progressValue,
  colorIndex,
  labelIndex,
  gifIndex,
  handleProgress,
  ServiceInfo
}) {



  return (
    <div >

      <Container className="progressbar-container">
        <h2 style={{color:"#264d59"}} className="fontSize_h2">{progressLabel[labelIndex]}</h2>
        <img
          className="animated-gif"
          src={process.env.PUBLIC_URL + gif[gifIndex]}
          // style={{borderRadius:"25%", backgroundColor:"white",objectFit:"contain"}}
          // style={{borderRadius:"50%", border:"10px solid white", backgroundColor:"white",objectFit:"contain"}}
        />
        <br/>
        {/* <h2 className="fontSize_h2">{progressValue / 16.67}/6</h2> */}

        <Progress animated color={color[colorIndex]} value={progressValue}>
        {/* {progressValue}% */}
        </Progress>
      </Container>


    </div>
  );
}
