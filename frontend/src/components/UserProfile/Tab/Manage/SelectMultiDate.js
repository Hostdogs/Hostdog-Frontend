import React, { useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import moment from "moment-timezone";

export default function SelectMultiDate() {
  const [selectedDays, setSelectedDays] = useState([]);

  function handleDayClick(day, { selected }) {
    if (selected) {
      onDayDelete(day);
    } else {
      setSelectedDays((prevSelectedDays) => {
        return [...prevSelectedDays, day];
      });
    }
    console.log(selectedDays);
  }

  function onDayDelete(day) {
    setSelectedDays((prevSelectedDays) => {
      return prevSelectedDays.filter((selectedDay) => {
        return !DateUtils.isSameDay(selectedDay, day);
      });
    });
  }
  return (
    <div>
      <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />
    </div>
  );
}
