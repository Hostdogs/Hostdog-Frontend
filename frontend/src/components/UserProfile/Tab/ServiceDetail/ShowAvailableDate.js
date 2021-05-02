import React, { useState, useEffect } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import moment from "moment-timezone";
// const startDate = [
//   new Date(2021, 4, 12),
//   new Date(2021, 4, 2),
//   {
//     after: new Date(2021, 4, 20),
//     before: new Date(2021, 4, 25),
//   },
// ];

const weekdayStyle = `.DayPicker-Weekday {
  color: black;
}`;
export default function ShowAvailableDate(props) {
  const { newAvailableDates } = props;

  const [availableDates, setAvailableDates] = useState(newAvailableDates);

  useEffect(() => {
    setAvailableDates(newAvailableDates);
    console.log(newAvailableDates)
  }, [newAvailableDates]);

  let twoMonthsLater = new Date();
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

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
        selectedDays={availableDates}
      />
    </div>
  );
}
