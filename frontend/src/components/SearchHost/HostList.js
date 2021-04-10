import {useState} from 'react'
import Host from './Host'
export default function HostList() {
  const hostdata =[
    {
      id:1,
      hostName: "Phol",
      dateAvail:"ทุกวัน",
      distancefromCus: "25 กม.",

    },
    {
      id:2,
      hostName: "Bas",
      dateAvail:"เสาร์,อาทิตย์",
      distancefromCus: "30 กม.",
    },
    {
      id:3,
      hostName: "Pat",
      dateAvail:"จันทร์-ศุกร์",
      distancefromCus: "40 กม.",
    }
  ] ;
  return (
    <div>
      {hostdata.map((hd) => (
        <Host id={hd.id} host={hd}/>
      ))}
    </div>
  );
}
