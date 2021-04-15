
import Host from './Host'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

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
    },
    {
      id:4,
      hostName: "Pure",
      dateAvail:"จันทร์-ศุกร์",
      distancefromCus: "50 กม.",
    }
  ] ;
  return (
    <>
   
    <Container className="host-container" >
        
      {hostdata.map((hd) => (

   
        <Host key={hd.id} host={hd}/>
 
        
      ))}

    </Container>
    </>
  );
}
