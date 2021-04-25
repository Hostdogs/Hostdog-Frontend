import { Container, Label, Row, Col, Progress, Button } from "reactstrap";
import "./ProgressPage.css";

const progressLabel = [
  "ถึงเวลาบริการแล้วครับ ย้าฮูว...",
  "ผู้รับฝากกำลังรอรับสุนัขของคุณครับ",
  "พวกเรากำลังดูแลสุนัขของคุณครับ",
  "ครบกำหนดแล้วกรุณามารับสุนัขของคุณได้ครับ",
  "บริการเสร็จสิ้นแล้วครับ",
  "คุณได้ยกเลิกบริการแล้วครับ",
  "",
];
const color = ["warning", "info", "", "success", "danger"];
const gif = [
  "/congrat.gif",
  "/waiting.gif",
  "/onhost.gif",
  "./wavecall.gif",
  "/bye.gif",
  "/sad.gif",
];
export default function ProgressBar({
  progressValue,
  colorIndex,
  labelIndex,
  gifIndex,
  handleProgress,
}) {
  return (
    <div>
      <br />
      <br />
      <br />
      <Container className="progressbar-container">
        <h2>{progressLabel[labelIndex]}</h2>
        <img
          src={process.env.PUBLIC_URL + gif[gifIndex]}
          width="40%"
          height="40%"
        />
        <br/>
        <h2>{progressValue / 20}/5</h2>

        <Progress animated color={color[colorIndex]} value={progressValue}>
        {progressValue}%
        </Progress>
      </Container>

      <Button
        onClick={handleProgress}
        style={{ position: "fixed", bottom: 0, right: 0 }}
      >
        Progress
      </Button>

    </div>
  );
}
