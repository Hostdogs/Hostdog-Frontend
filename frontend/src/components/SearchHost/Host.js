import { Card, CardTitle, CardText } from 'reactstrap';
export default function Host({ host }) {
  return (
    <div className="host" key={host.id}>

    <Card body outline color="warning" style={{background:"#fff3d0"}} >
    <CardTitle tag="h5" >            {host.hostName}
            {"     "}
            {host.distancefromCus}</CardTitle>
    <CardText > วันว่าง:{host.dateAvail}</CardText>
    </Card>

       

    </div>
  );
}
