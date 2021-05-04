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
  Button,
} from "reactstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {  useHistory } from "react-router-dom";
import './ProfileCard.css'
const ProfileCard = ({ pageCollapse, Account, setAccount, userIsHost ,isOwned}) => {
  
  let history = useHistory()
  const [img, setimg] = useState(null);
  const [role, setrole] = useState(null);
  const [Name, setName] = useState(null);
  const [isLoad, setisLoad] = useState(false);
  const [urllink, seturllink] = useState(null)
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
      seturllink("/service/host/"+Account.id)
      setisLoad(true);
    }
  }, [Account]);
  // console.log(isHost)
  const onClickService = () => {
    history.push(urllink)
    history.go(0)
  }
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
        {userIsHost||role==="ผู้ฝากสุนัข" ? (null) : (
          <div style={{ position: "absolute", right: "5px", top: "25px" }}>
            <button className="buttonUseService" onClick={onClickService} >ใช้บริการ <FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        )}


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
                  height: "120px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </Collapse>

        <br />
        <CardTitle tag="h3">
          {Name || <SkeletonTheme color="#f9e07f"> <Skeleton style={{ width: "250px" }} /></SkeletonTheme>}
        </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {role || <SkeletonTheme color="#f9e07f"><Skeleton style={{ width: "100px" }} /></SkeletonTheme>}
        </CardSubtitle>
        <Collapse isOpen={pageCollapse}>
          <br />
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
