import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useState } from "react";

export const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  function renderMonthDates(allDates: Date[]) {
    const firstDayOfWeek = getDay(allDates[0]);

    return Array.from(
      { length: Math.ceil((firstDayOfWeek + allDates.length) / 7) },
      (_, weekIndex) => (
        <tr key={weekIndex}>
          {Array.from({ length: 7 }, (_, dateIndex) => {
            const index = weekIndex * 7 + dateIndex;
            const date =
              index < firstDayOfWeek ||
              index >= firstDayOfWeek + allDates.length
                ? null
                : allDates[index - firstDayOfWeek];

            return (
              <td
                className={`${date && isToday(date) ? "text-bg-primary" : ""}`}
                key={index}
              >
                {date ? format(date, "d") : ""}
              </td>
            );
          })}
        </tr>
      )
    );
  }

  return (
    <table className="table table-borderless table-responsive caption-top">
      <caption className="text-capitalize text-center text-bg-primary">
        {format(date, "MMMM yyyy")}
      </caption>

      <thead>
        <tr>
          {daysOfTheWeek.map((day) => (
            <th className="text-capitalize" key={day}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{renderMonthDates(daysInMonth)}</tbody>
    </table>
  );
};
