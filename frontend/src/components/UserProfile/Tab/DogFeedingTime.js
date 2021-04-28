import React, { useState, useEffect } from "react";
import { Button, Label, Input, Row, Col, Table } from "reactstrap";

export default function DogFeedingTime(props) {
  const [time, setTime] = useState("");
  // const [allTimes, setAllTimes] = useState([]);
  const { allTimes, setAllTimes } = props;

  function onTimeChange(event) {
    setTime(event.target.value);
  }

  function onTimeSubmit(event) {
    event.preventDefault();
    if (time !== "") {
      const newTime = {};
      newTime.id = Date.now().toString();
      newTime.time = time;
      setAllTimes((prevAllTimes) => {
        return [...prevAllTimes, newTime];
      });
      setTime("");
    }
  }

  function onTimeDelete(timeId) {
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
              <Col xs="6">{theTime.time}</Col>
              <Col xs="6" style={{ textAlign: "end" }}>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => onTimeDelete(theTime.id)}
                >
                  ลบ
                </Button>
              </Col>
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
              <th>#</th>
              <th>เวลาให้อาหาร</th>
            </tr>
          </thead>
          <tbody>{timeElements}</tbody>
        </Table>
      ) : null}

      <Input type="time" name="time" value={time} onChange={onTimeChange} />
      <Button onClick={onTimeSubmit}>เพิ่ม</Button>
    </div>
  );
}
