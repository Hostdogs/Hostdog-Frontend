import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import BlankPending from './BlankPending'
import PendingList from './PendingList'
export default function InboxPage() {
    const [cookies,setCookie] = useCookies(["mytoken", "user_id"])
    const [pendingData, setpendingData] = useState([])
    useEffect(() => {
        setpendingData([{service_id:"1", customer_id:"1",dog_id:"1",main_status:"Pending",},{service_id:"1", customer_id:"1",dog_id:"1",main_status:"Pending",}])
    }, [])
    
    return (
        <div style={{paddingTop:"35px"}}>
            {pendingData.length>0? (<PendingList pendingData={pendingData}/>):(<BlankPending/>)}
        
        </div>
    )
}
