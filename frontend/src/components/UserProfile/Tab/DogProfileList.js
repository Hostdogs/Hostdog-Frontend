import React, { useState } from "react";
import DogProfileItem from "./DogProfileItem";

export default function DogProfileList(props) {
  const { dogInfos } = props;

  const dogElements = dogInfos.map((dogInfo, index) => {
    return <DogProfileItem key={index} dogInfo={dogInfo} />;
  });
  return <div>{dogElements}</div>;
}
