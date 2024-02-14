"use client";

import { pallete } from "@/constants/palette";
import { NotionDB } from "@/types/notion";
import { useMemo, useState } from "react";

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
  const [selectYear, setSelectYear] = useState(2024);

  /**
   * notion 포스트를 연도별로 나눠서 관리
   */
  const postListByYear = useMemo(() => {
    function dividePostByYear() {
      const result: {
        [year: number]: { date: string; value: null | NotionDB }[][];
      } = {};

      const notionDBDateList = postList.map((post) => post.properties["Publish date"].date.start ?? "");

      [2023, 2024].forEach((year) => {
        const firstDay = new Date(`${year}-01-01`);
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
          dayByWeekList[currentDayOfWeek].push(getNotionPostByFullDate(currentDate, notionDBDateList));
        }

        result[year] = dayByWeekList;
      });

      return result;
    }

    const getNotionPostByFullDate = (currentDate: Date, notionDBDateList: string[]) => {
      const dayOfMonth = currentDate.getDate();
      const monthOfYear = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${monthOfYear < 10 ? "0" + monthOfYear : monthOfYear}-${dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth}`;

      const index = notionDBDateList.indexOf(formattedDate);
      return {
        date: formattedDate,
        value: index !== -1 ? postList[index] : null,
      };
    };

    return dividePostByYear();
  }, [postList]);

  const onClickYear = (year: number) => setSelectYear(year);

  return (
    <div className="pb-5 flex">
      <div className="overflow-x-scroll ">
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
            {postListByYear[selectYear]?.map((dayByWeek, index) => (
              <tr key={`week_${index}`}>
                {dayByWeek.map(({ value, date }) => {
                  const contentTypeName = value?.properties["Type of content"].select.name;
                  const contentColor = contentTypeName ? pallete[contentTypeName] : pallete.Blog;

                  return date === "" ? (
                    <td key={date} className="min-w-3.5 h-3.5 m-px"></td>
                  ) : (
                    <td
                      key={date}
                      title={`${date}_${value ? value.properties["Type of content"].select.name : ""}`}
                      className={`${value ? contentColor : "bg-slate-950"} rounded min-w-3.5 h-3.5 m-px`}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col ml-5">
        {[2023, 2024].map((year) => {
          return (
            <button
              onClick={() => onClickYear(year)}
              className={`my-.5 text-xs py-2 pl-4 pr-10 rounded-lg ${selectYear === year ? "bg-blue-700" : "text-white/40 hover:bg-gray-300/5 "}`}
              key={`lawn_key_${year}`}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Lawn;
