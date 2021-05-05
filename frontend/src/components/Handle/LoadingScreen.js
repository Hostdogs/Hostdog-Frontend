import React from 'react'
import { Spinner } from 'reactstrap'

export default function LoadingScreen() {
    return (
        <div>
            <div style={{ height: "100vh", overflow: "hidden", width: "100vw", position: "fixed", backgroundColor: "rgba(0,0,0,0.35)", zIndex: "10000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                <Spinner color="warning" style={{ width: "80px", height: "80px", borderWidth: "8px" }} />
            </div>
        </div>
    )
}
