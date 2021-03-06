import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BlankPending from "./BlankPending";
import PendingList from "./PendingList";
import { Container } from "reactstrap";
import ServiceAPI from "../API/ServiceAPI";
import Loading from "../Handle/Loading";
export default function InboxPage() {
    const [cookies, setCookie] = useCookies(["mytoken", "user_id"])
    const [pendingData, setpendingData] = useState([])
    const [isLoad, setisLoad] = useState(false)
    useEffect(() => {
        // setpendingData([{ service_id: "1", customer_id: "1", dog_id: "1", main_status: "Pending", }, { service_id: "1", customer_id: "1", dog_id: "1", main_status: "Pending", }])
        if (cookies["mytoken"]) {
            getPending()
            console.log("interval set")
            setInterval(()=>getPending(),10000);
        }

    }, [cookies])

    const getPending = () => {
        ServiceAPI.getAllPending(cookies["mytoken"]).then(res => {
            console.log("Pendingdata:", res.data)
            setpendingData(res.data)
            setisLoad(true)
        })
    }

    return (
        <div style={{ paddingTop: "75px" }}>
            <Container>
                <h1 className="heading1">รายการคำร้องขอของคุณ :</h1>
            </Container>
            <div style={{ minHeight: "100vh" }}>
                {isLoad && pendingData.length > 0 ? (<PendingList pendingData={pendingData} setpendingData={setpendingData}/>) : (null)}
                {isLoad && pendingData.length === 0 ? (<BlankPending />) : (null)}
            </div>

      {/* {!isLoad?(
                <Loading style={{minHeight:"90vh"}}/>
            ):(null)} */}
    </div>
  );
}
