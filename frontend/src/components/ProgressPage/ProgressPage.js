import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SideBar from "../sidebar/SideBar";
import ProgressBar from "./ProgressBar";
import React, { useState, useEffect } from "react";
import ServiceDetail from "./ServiceDetail";

export default function ProgressPage() {
  const [progressValue, setProgressValue] = useState(0);

  const [colorIndex, setColorIndex] = useState(3);

  const [labelIndex, setLabelIndex] = useState(0);

  const [gifIndex, setGifIndex] = useState(0);

  const handleProgress = () => {
    if (progressValue >= 100 || gifIndex >= 5) {
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
    setColorIndex(4);
    setLabelIndex(5);
    setGifIndex(5);
  };
  useEffect(() => {
    setProgressValue(progressValue + 20);
  }, []);

  return (
    <div style={{backgroundColor:"#fdf2ca"}}>
      <NavbarIsAuth />

      <ProgressBar
        progressValue={progressValue}
        colorIndex={colorIndex}
        labelIndex={labelIndex}
        gifIndex={gifIndex}
        handleProgress={handleProgress}
      />

      <ServiceDetail onCancel={handleCancel} />
      <br />
    </div>
  );
}
