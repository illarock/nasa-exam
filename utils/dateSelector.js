"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ startDate, dateChange }) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => dateChange(date)}
      locale="hk"
    />
  );
};

export default DateSelector;
