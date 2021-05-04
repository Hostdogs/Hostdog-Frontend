import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DogFeedingTime from "./DogFeedingTime";
import { useCookies } from "react-cookie";
import DogAPI from "../../../API/DogAPI";

export default function EditFeedingTime(props) {
  const { isOwned, dog_status } = props;
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
    if (allTimes.length > 0) {
      idTimeDelete.forEach((timeId) => {
        DogAPI.DeleteFeedingTime(myToken, myId, props.dogId, timeId);
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
    } else {
      alert("กรุณาเพิ่มเวลาให้อาหาร");
    }
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
            isOwned={isOwned}
            dog_status={dog_status}
          />
        </ModalBody>
        <ModalFooter>
          {isOwned && dog_status === "idle" ? (
            <Button color="primary" onClick={submitBtn}>
              ยืนยัน
            </Button>
          ) : null}
          {isOwned && dog_status === "idle" ? (
            <Button color="secondary" onClick={cancelBtn}>
              ยกเลิก
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    </div>
  );
}
