export default function Host({ host }) {
  return (
    <div>

        <h3>{host.hostName}{host.distancefromCus}</h3> 
      <p>วันว่าง:{host.dateAvail}</p>
    </div>
  );
}
