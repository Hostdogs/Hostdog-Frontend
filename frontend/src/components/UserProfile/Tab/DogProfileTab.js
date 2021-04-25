import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "reactstrap";
import DogProfileAddForm from "./DogProfileAddForm";
import DogProfileList from "./DogProfileList";

export default function DogProfileTab() {
  const [dogInfos, setdogInfos] = useState([]);
  return (
    <div>
      <ButtonGroup style={{ marginTop: "9px" }}>
        <DogProfileAddForm />
      </ButtonGroup>
      <hr />
      <DogProfileList dogInfos={dogInfos} />
    </div>
  );
}
