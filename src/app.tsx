import { useState } from "react";
import { Calendar } from "./components/calendar";
import {
  addMonths,
  addYears,
  format,
  setMonth,
  subMonths,
  subYears,
} from "date-fns";

export default function App() {
  const [view, setView] = useState<"month" | "year">("month");
  const [date, setDate] = useState(new Date());

  function showPrevious() {
    if (view === "month") {
      setDate(subMonths(date, 1));
    }
    if (view === "year") {
      setDate(subYears(date, 1));
    }
  }

  function showNext() {
    if (view === "month") {
      setDate(addMonths(date, 1));
    }
    if (view === "year") {
      setDate(addYears(date, 1));
    }
  }

  function showToday() {
    setDate(new Date());
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col gap-5 mx-auto">
        <div
          className={`sticky top-0 z-10 ${
            view === "year" && "w-full shadow-lg"
          } p-3 flex justify-between items-center bg-white dark:bg-slate-900 `}
        >
          <div className="flex gap-2 items-center">
            <button
              className="h-fit p-2 border hover:bg-sky-400 active:scale-95"
              type="button"
              onClick={showPrevious}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                width="20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                />
              </svg>
            </button>
            <button
              className="h-fit p-2 border hover:bg-sky-400 active:scale-95"
              type="button"
              onClick={showNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                width="20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                />
              </svg>
            </button>
            <button className="p-2 text-2xl text-blue-600 font-bold cursor-pointer">
              {view === "month" && format(date, `MMM yyyy`)}
              {view === "year" && format(date, "yyyy")}
            </button>
          </div>
          <div className="flex gap-3">
            <button
              className="p-1 border text-lg hover:bg-sky-400 active:scale-95"
              type="button"
              onClick={showToday}
            >
              Today
            </button>
            <button
              className="p-1 border text-lg hover:bg-sky-400 active:scale-95"
              type="button"
              onClick={() => {
                setView("month");
              }}
            >
              Month
            </button>
            <button
              className="p-1 border text-lg hover:bg-sky-400 active:scale-95"
              type="button"
              onClick={() => {
                setView("year");
              }}
            >
              Year
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 w-[90%] mx-auto">
          {view === "month" && <Calendar date={date} />}
          {view === "year" &&
            Array.from({ length: 12 }).map((_, i) => {
              return (
                <div
                  className="flex flex-col w-full max-w-[425px] mx-auto items-center"
                  key={i}
                >
                  <span className="py-2 w-full font-bold bg-sky-400 text-2xl text-center">
                    {format(setMonth(date, i), "MMMM")}
                  </span>
                  <Calendar date={setMonth(date, i)} key={i} />
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
