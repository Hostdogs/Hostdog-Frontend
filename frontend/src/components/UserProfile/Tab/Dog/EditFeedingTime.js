import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DogFeedingTime from "./DogFeedingTime";
import { useCookies } from "react-cookie";
import DogAPI from "../../../API/DogAPI";

export default function EditFeedingTime(props) {
  const [modal, setModal] = useState(false);
  const [allTimes, setAllTimes] = useState([]);
  const [cookies] = useCookies(["mytoken", "user_id"]);
  const [idTimeDelete, setIdTimeDelete] = useState([]);
  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];

  const toggle = () => setModal(!modal);

  const getFeedingTime = () => {
    DogAPI.GetFeedingTime(myToken, myId, props.dogId).then((resp) =>
      setAllTimes(resp.data)
    );
    toggle();
  };

  function cancelBtn() {
    setIdTimeDelete([]);
    toggle();
  }

  function submitBtn() {
    //console.log(allTimes);
    idTimeDelete.forEach((timeId) => {
      DogAPI.DeleteFeedingTime(
        myToken,
        myId,
        props.dogId,
        timeId
      ).then((resp) => console.log(resp));
    });

    const newTime = allTimes.filter((time) => {
      return isNaN(time.id);
    });
    newTime.forEach((time) => {
      DogAPI.AddFeedingTime(myToken, myId, props.dogId, time).then((resp) =>
        console.log(resp)
      );
    });

    setIdTimeDelete([]);
    toggle();
  }

  return (
    <div>
      <Button size="sm" color="primary" onClick={getFeedingTime}>
        {props.labelBtn}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>เวลาให้อาหาร</ModalHeader>
        <ModalBody>
          <DogFeedingTime
            allTimes={allTimes}
            setAllTimes={setAllTimes}
            idTimeDelete={idTimeDelete}
            setIdTimeDelete={setIdTimeDelete}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitBtn}>
            ยืนยัน
          </Button>
          <Button color="secondary" onClick={cancelBtn}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
