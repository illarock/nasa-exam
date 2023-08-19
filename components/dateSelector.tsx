"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./dateselector.css";

const DateSelector = ({
  selDate,
  startDate,
  endDate,
  dateChange,
  placeholder,
  isDateRange,
}: {
  selDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  dateChange: any;
  placeholder?: string;
  isDateRange?: boolean;
}) => {
  return (
    <div>
      {!isDateRange && (
        <DatePicker
          selected={selDate}
          onChange={(date: Date) => dateChange(date)}
          isClearable={true}
          withPortal
          placeholderText={placeholder}
          className=""
        />
      )}

      {isDateRange && (
        <div className="date-range">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [Date | null, Date | null]) =>
              dateChange(update)
            }
            isClearable={true}
            placeholderText={placeholder}
            className=""
            withPortal
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
