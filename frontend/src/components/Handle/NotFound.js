import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound() {
    return (
        <div>
            <h1>404 - ไม่พบหน้านี้!</h1>
            <Link to="/">
                กลับสู่หน้าแรก
            </Link>
        </div>
    )
}
