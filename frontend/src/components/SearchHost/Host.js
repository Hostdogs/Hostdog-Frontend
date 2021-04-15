import { Card, CardTitle, CardText } from 'reactstrap';
export default function Host({ host }) {
  return (
    <div className="host" >

    <Card body outline color="warning" style={{background:"#fff3d0",height:"60vh"}} >
    <CardTitle tag="h5" >            {host.hostName}
            {"     "}
            {host.distancefromCus}</CardTitle>
    <CardText > วันว่าง:{host.dateAvail}</CardText>
    </Card>

       

    </div>
  );
}
