"use client";

import { pallete } from "@/constants/palette";
import { NotionDB } from "@/types/notion";

const monthSpanList = [
  { month: "Jan", span: 5 },
  { month: "Feb", span: 4 },
  { month: "Mar", span: 5 },
  { month: "Apr", span: 4 },
  { month: "May", span: 4 },
  { month: "Jun", span: 5 },
  { month: "Jul", span: 4 },
  { month: "Aug", span: 4 },
  { month: "Sep", span: 5 },
  { month: "Oct", span: 4 },
  { month: "Nov", span: 4 },
  { month: "Dec", span: 5 },
];

function Lawn({ postList }: { postList: NotionDB[] }) {
  const firstDay = new Date("2024-01-01");

  const notionDBDateList = postList.map((post) => post.properties["Publish date"].date.start ?? "");

  const dayByWeekList: { date: string; value: null | NotionDB }[][] = Array.from({ length: 7 }, () => []);

  for (let i = 0; i < 366; i++) {
    const currentDate = new Date(firstDay);
    currentDate.setDate(currentDate.getDate() + i);
    const currentDayOfWeek = currentDate.getDay();

    if (i === 0) {
      let emptyCount = currentDayOfWeek - 1;
      while (emptyCount >= 0) {
        dayByWeekList[emptyCount].push({ date: "", value: null });
        emptyCount--;
      }
    }

    const dayOfMonth = currentDate.getDate();
    const monthOfYear = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${monthOfYear < 10 ? "0" + monthOfYear : monthOfYear}-${dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth}`;

    const index = notionDBDateList.indexOf(formattedDate);

    if (index !== -1) {
      dayByWeekList[currentDayOfWeek].push({ date: formattedDate, value: postList[index] });
    } else {
      dayByWeekList[currentDayOfWeek].push({ date: formattedDate, value: null });
    }
  }

  return (
    <div className="pb-5">
      <div className="overflow-x-scroll hide-scroll">
        <table className="table-fixed border-separate border-spacing-.5">
          <thead>
            <tr>
              {monthSpanList.map(({ month, span }) => (
                <td colSpan={span} key={month}>
                  {month}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {dayByWeekList.map((dayByWeek, index) => (
              <tr key={`week_${index}`}>
                {dayByWeek.map(({ value, date }) => {
                  const contentTypeName = value?.properties["Type of content"].select.name;
                  const contentColor = contentTypeName ? pallete[contentTypeName] : pallete.Blog;

                  const emptyCell = <td key={date} className="min-w-4 h-4 m-px"></td>;
                  const filledCell = (
                    <td
                      key={date}
                      title={`${date}_${value ? value.properties["Type of content"].select.name : ""}`}
                      className={`${value ? contentColor : "bg-slate-950"} rounded min-w-4 h-4 m-px`}
                    ></td>
                  );

                  return date === "" ? emptyCell : filledCell;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lawn;
