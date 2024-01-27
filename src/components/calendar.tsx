import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  subMonths,
  subYears,
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
                className={`text-lg ${
                  date && isToday(date) ? "bg-blue-500 text-white " : ""
                }`}
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

  function handlePrevYearClick() {
    setDate(subYears(date, 1));
  }

  function handlePrevMonthClick() {
    setDate(subMonths(date, 1));
  }

  function handleNextMonthClick() {
    setDate(addMonths(date, 1));
  }

  function handleNextYearClick() {
    setDate(addYears(date, 1));
  }

  function handleTodayClick() {
    setDate(new Date());
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <button
            className="p-2 border hover:bg-sky-400 active:scale-95"
            type="button"
            title="Go to previous year"
            onClick={handlePrevYearClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              width="20"
            >
              <path
                fillRule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <button
            className="p-2 border hover:bg-sky-400 active:scale-95"
            type="button"
            title="Go to previous month"
            onClick={handlePrevMonthClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              width="20"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <button
            className="p-2 border hover:bg-sky-400 active:scale-95"
            type="button"
            title="Go to next month"
            onClick={handleNextMonthClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              width="20"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
          <button
            className="p-2 border hover:bg-sky-400 active:scale-95"
            type="button"
            title="Go to next year"
            onClick={handleNextYearClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              width="20"
            >
              <path
                fillRule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
        <div>
          <button
            className="p-1 border text-lg hover:bg-sky-400 active:scale-95"
            type="button"
            onClick={handleTodayClick}
          >
            Today
          </button>
        </div>
      </div>
      <table className=" table-auto text-center">
        <caption className="py-1 bg-blue-600 text-white text-2xl">
          {format(date, "MMMM yyyy")}
        </caption>

        <thead>
          <tr>
            {daysOfTheWeek.map((day) => (
              <th className="capitalize p-2 text-lg" key={day}>
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
