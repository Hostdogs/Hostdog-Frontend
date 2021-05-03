import React, { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Alert,
  CardFooter,
  List,
  Collapse,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
const ProfileCard = ({ pageCollapse, Account, setAccount }) => {
  const [img, setimg] = useState(null);
  const [role, setrole] = useState(null);
  const [Name, setName] = useState(null);
  const [isLoad, setisLoad] = useState(false);
  const placeholderPath = "/user_placeholder.svg";
  useEffect(() => {
    console.log("Acc", Account);

    if (Account) {
      let roledata = "";
      if (Account.customer) {
        roledata = "customer";
        setrole("ผู้ฝากสุนัข");
      } else if (Account.host) {
        roledata = "host";
        setrole("ผู้รับเลี้ยงสุนัข");
      }
      setimg(Account[roledata].picture);
      setName(Account[roledata].first_name + " " + Account[roledata].last_name);

      setisLoad(true);
    }
  }, [Account]);
  // console.log(isHost)
  return (
    <Card style={{ border: "none" }}>
      <CardBody
        style={{
          textAlign: "center",
          backgroundColor: "#ffbb3cd5",
          height: "30%",
          width: "100%",
        }}
      >
        <Collapse isOpen={pageCollapse}>
          <div id="mainContainer" class="container">
            <div class="panel-body">
              <br />
              <img
                src={img || placeholderPath}
                class="img-responsive center-block"
                style={{
                  borderRadius: "50%",
                  width: "120px",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </Collapse>

        <br />
        <CardTitle tag="h3">
          {Name || <Skeleton style={{ width: "250px" }} />}
        </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {role || <Skeleton style={{ width: "100px" }} />}
        </CardSubtitle>
        <Collapse isOpen={pageCollapse}>
          <br />
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
