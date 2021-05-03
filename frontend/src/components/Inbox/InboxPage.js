import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import BlankPending from './BlankPending'
import PendingList from './PendingList'
import {Container} from 'reactstrap'
import ServiceAPI from '../API/ServiceAPI'
export default function InboxPage() {
    const [cookies, setCookie] = useCookies(["mytoken", "user_id"])
    const [pendingData, setpendingData] = useState()
    useEffect(() => {
        // setpendingData([{ service_id: "1", customer_id: "1", dog_id: "1", main_status: "Pending", }, { service_id: "1", customer_id: "1", dog_id: "1", main_status: "Pending", }])
        if(cookies["mytoken"]){
            ServiceAPI.getAllPending(cookies["mytoken"]).then(res=>{
                console.log(res.data)
            })
        }
        
    }, [cookies])

    return (
        <div style={{ paddingTop: "75px" }}>
            <Container>
                <h1 className="heading1">รายการคำร้องขอของคุณ :</h1>
            </Container>
            {pendingData ? (<PendingList pendingData={pendingData} />) : (<BlankPending />)}
        </div>
    )
}
