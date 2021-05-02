import React, { useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import moment from "moment-timezone";

export default function SelectMultiDate(props) {
  const { selectedDays, setSelectedDays } = props;

  let twoMonthsLater = new Date();
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

  function handleDayClick(day, { selected }) {
    if (selected) {
      onDayDelete(day);
    } else {
      setSelectedDays((prevSelectedDays) => {
        return [...prevSelectedDays, day];
      });
    }
  }

  function onDayDelete(day) {
    setSelectedDays((prevSelectedDays) => {
      return prevSelectedDays.filter((selectedDay) => {
        return !DateUtils.isSameDay(selectedDay, day);
      });
    });
  }

  const weekdayStyle = `.DayPicker-Weekday {
    color: black;
  }`;

  return (
    <div
      style={{ color: "black", backgroundColor: "white", borderRadius: "20px" }}
    >
      <style>{weekdayStyle}</style>
      <DayPicker
        disabledDays={{
          after: twoMonthsLater,
          before: new Date(),
        }}
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
      />
    </div>
  );
}
