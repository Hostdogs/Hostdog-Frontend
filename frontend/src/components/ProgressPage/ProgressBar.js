import { Container, Label, Row, Col, Progress, Button } from "reactstrap";
import "./ProgressPage.css";
import React, { useState, useEffect } from "react";
import ServiceDetail from "./ServiceDetail";
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
export default function ProgressBar({ onCancel }) {
  const [progressValue, setProgressValue] = useState(0);

  const [colorIndex, setColorIndex] = useState(3);

  const [labelIndex, setLabelIndex] = useState(0);

  const [gifIndex, setGifIndex] = useState(0);

  const handleProgress = () => {
    console.log(colorIndex);
    if (progressValue >= 100) {
      setLabelIndex(0);
      setProgressValue(20);
      setColorIndex(3);
      setGifIndex(0);
    } else {
      setLabelIndex(labelIndex + 1);
      setColorIndex(3);
      setProgressValue(progressValue + 20);
      setGifIndex(gifIndex + 1);
    }
  };
  const handleCancel = () => {
    setProgressValue(100);
    setColorIndex(4);
    setLabelIndex(5);
    setGifIndex(5);
  };
  useEffect(() => {
    setProgressValue(progressValue + 20);
  }, []);

  return (
    <div>
      <br />
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

        <Progress color={color[colorIndex]} value={progressValue} />
      </Container>

      <ServiceDetail onCancel={handleCancel} />
      <Button
        onClick={handleProgress}
        style={{ position: "fixed", bottom: 0, right: 0 }}
      >
        Progress
      </Button>
    </div>
  );
}
