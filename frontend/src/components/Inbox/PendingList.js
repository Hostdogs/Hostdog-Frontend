import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Container } from "reactstrap";
import Pending from "./Pending";
import './Pending.css'

export default function PendingList({ pendingData }) {
  // const [pendingList, setpendingList] = useState()
  useEffect(() => {
    if (pendingData) {
      // setpendingList(pendingData)
      console.log(pendingData)
    }
  }, [pendingData])
  return (

    <div>

      <div style={{ height: "100vh" }}>
        <br />
        {pendingData ? (
          <div>
            {pendingData.map((pendingTask) => (
              <div>
                <Pending key={pendingTask.service_id} service={pendingTask} />
                <br />
              </div>
            ))}
          </div>
        ) : (null)}


      </div>

    </div>
  );
}
