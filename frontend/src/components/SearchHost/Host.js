import { Card, CardTitle, CardText } from "reactstrap";
export default function Host({ host }) {
  return (
    <Card
      body
      outline
      color="warning"
      className="host"
      style={{
        background: "#fff3d0",
        height: "60vh",
        margin:"5px 0px",
      }}
    >
      <CardTitle tag="h5">
        {" "}
        {host.hostName}
        {"     "}
        {host.distancefromCus}
      </CardTitle>
      
      <CardText> วันว่าง:{host.dateAvail}</CardText>
    </Card>
  );
}
