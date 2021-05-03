import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Container } from "reactstrap";
import Pending from "./Pending";
import './Pending.css'

export default function PendingList({ pendingData }) {
  return (
    
    <div>
      <Container>
        <h1 className="heading1">Your Pending :</h1>
      </Container>
    <div style={{paddingTop:"35px"}}>
    {pendingData.map((pendingTask) => (
        <div>
          <Pending key={pendingTask.service_id} host={pendingTask} />
          <br />
        </div>
      ))}
    </div>
      
    </div>
  );
}
