import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Container } from "reactstrap";
import Pending from "./Pending";
import './Pending.css'

export default function PendingList({ pendingData ,isLoad}) {
  
  // const [pendingList, setpendingList] = useState()
  useEffect(() => {
    if (pendingData) {
      // setpendingList(pendingData)
      console.log(pendingData)
    }
  }, [pendingData])
  return (

    <div>
      
      <div >
        <br />
        {pendingData.length>0 ? (
          <div>
            {pendingData.map((pendingTask) => (
 
                <Pending key={pendingTask.id} service={pendingTask} />
   
            ))}
          </div>
        ) : (null)}


      </div>

    </div>
  );
}
