import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loading() {
    return (
        <div>
            <div style={{ height: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" ,overflow:"hidden"}}>
                <Spinner color="warning" style={{width: "80px",height: "80px",borderWidth:"8px"}} />
            </div>
        </div>
    )
}
