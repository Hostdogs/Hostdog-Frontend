import React, { useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import moment from "moment-timezone";
const startDate = [
  new Date(2021, 4, 12),
  new Date(2021, 4, 2),
  {
    after: new Date(2021, 4, 20),
    before: new Date(2021, 4, 25),
  },
];
export default function ShowAvailableDate() {
  const [AvailableDate, setAvailableDate] = useState(startDate);
  let twoMonthsLater = new Date();
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

  return (
    <div>
      <DayPicker
        disabledDays={{
          after: twoMonthsLater,
          before: new Date(),
        }}
        selectedDays={AvailableDate}
      />
    </div>
  );
}
