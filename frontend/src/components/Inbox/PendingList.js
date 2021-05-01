import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Pending from './Pending'

export default function PendingList({pendingData}) {
    
    return (
        <div>
            {pendingData.map((pendingTask) => (
            <div>
              <Pending key={pendingTask.service_id} host={pendingTask} />
              <br />
            </div>
          ))}
        </div>
    )
}
