import React,{useState,useEffect} from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Alert,
  CardFooter,
  List,
  Collapse
} from "reactstrap";

const ProfileCard = ({pageCollapse,Profile,isCustomer}) => {
  const [img, setimg] = useState("/")
  useEffect(() => {
    setimg(Profile.picture)
  }, [Profile])
  return (
      <Card>
      <CardBody
        style={{
          textAlign: "center",
          backgroundColor: "#ffbb3cd5",
          height: "30%",
          width:"100%"
        }}
      >
        <Collapse isOpen={pageCollapse}>
        <div id="mainContainer" class="container">
          <div class="panel-body">
            <br/>
            <img
              src={img}
              class="img-responsive center-block"
              style={{ borderRadius: "50%", width: "120px", height: "100%" }}
            />
          </div>
        </div>
        </Collapse>
        
        <br />
        <CardTitle tag="h3">{Profile.name} {Profile.surname}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {isCustomer ? (<>ผู้ฝากสุนัข</>):(<>ผู้รับเลี้ยงสุนัข</>)} 
        </CardSubtitle>
        <Collapse isOpen={pageCollapse}>
          <br/>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
