import React, { useState, useEffect } from "react";
import { Button, Label, Input, Row, Col, Table } from "reactstrap";
import moment from "moment-timezone";
export default function DogFeedingTime(props) {
  const { isOwned, dog_status } = props;
  const [time, setTime] = useState("");
  const { allTimes, setAllTimes, idTimeDelete, setIdTimeDelete } = props;

  console.log(dog_status);

  function onTimeChange(event) {
    setTime(event.target.value);
  }

  function onTimeSubmit(event) {
    event.preventDefault();
    if (time !== "") {
      const newTime = {};
      newTime.id = "time" + Date.now().toString();
      newTime.time = time;
      setAllTimes((prevAllTimes) => {
        return [...prevAllTimes, newTime];
      });
      setTime("");
    }
  }

  function onTimeDelete(timeId) {
    if (idTimeDelete !== undefined && !isNaN(timeId)) {
      setIdTimeDelete((prevTimeId) => {
        return [...prevTimeId, timeId];
      });
    }
    setAllTimes((prevAllTimes) => {
      return prevAllTimes.filter((theTime) => {
        return theTime.id !== timeId;
      });
    });
  }

  const timeElements = allTimes
    .sort(function (a, b) {
      return a.time.localeCompare(b.time);
    })
    .map((theTime, index) => {
      return (
        <tr key={theTime.id}>
          <th scope="row">{index + 1}</th>
          <td>
            <Row>
              <Col xs="6">{theTime.time.slice(0, 5)}</Col>
              {isOwned && dog_status !== "hosting" ? (
                <Col xs="6" style={{ textAlign: "end" }}>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => onTimeDelete(theTime.id)}
                  >
                    ลบ
                  </Button>
                </Col>
              ) : null}
            </Row>
          </td>
        </tr>
      );
    });

  return (
    <div>
      <Label>เวลาให้อาหาร</Label>
      {allTimes.length > 0 ? (
        <Table bordered>
          <thead>
            <tr>
              <th>ครั้งที่</th>
              <th>เวลาให้อาหาร</th>
            </tr>
          </thead>
          <tbody>{timeElements}</tbody>
        </Table>
      ) : null}
      {isOwned && dog_status !== "hosting" ? (
        <div>
          <Input type="time" name="time" value={time} onChange={onTimeChange} />
          <Button
            style={{ marginTop: "10px" }}
            color="primary"
            onClick={onTimeSubmit}
          >
            เพิ่ม
          </Button>
        </div>
      ) : null}
    </div>
  );
}
