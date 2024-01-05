import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  subMonths,
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

  function handlePrevClick() {
    setDate(subMonths(date, 1));
  }

  function handleNextClick() {
    setDate(addMonths(date, 1));
  }

  function handleTodayClick() {
    setDate(new Date());
  }

  return (
    <div className="my-auto">
      <div className="d-flex mb-2">
        <button
          className="btn border me-1 bg-body-secondary-hover"
          type="button"
          title="Go to previous month"
          onClick={handlePrevClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
        <button
          className="btn border me-1 bg-body-secondary-hover"
          type="button"
          title="Go to next month"
          onClick={handleNextClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
        <button className="btn border" type="button" onClick={handleTodayClick}>
          Today
        </button>
      </div>
      <table className="table table-borderless table-responsive caption-top text-center">
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
    </div>
  );
};
