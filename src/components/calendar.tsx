import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";

export const Calendar = ({ date }: { date: Date }) => {
  const daysOfTheWeek = ["su", "mo", "tu", "we", "th", "fr", "sa"];

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  function renderMonthDates(allDates: Date[]) {
    const firstDayOfWeek = getDay(allDates[0]);

    return Array.from(
      { length: Math.ceil((firstDayOfWeek + allDates.length) / 7) },
      (_, weekIndex) => (
        <tr className="grid grid-cols-7" key={weekIndex}>
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

  return (
    <table className="w-full text-center">
      <thead>
        <tr className="grid grid-cols-7">
          {daysOfTheWeek.map((day) => (
            <th className="capitalize p-2 text-lg" key={day}>
              {day}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{renderMonthDates(daysInMonth)}</tbody>
    </table>
  );
};
