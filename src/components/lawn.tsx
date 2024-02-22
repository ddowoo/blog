"use client";

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

const colorListByPostCount = ["bg-slate-950", "bg-green-500/20", "bg-green-500/50", "bg-green-500/80", "bg-green-500"];

type DateAndPostList = {
  date: string | null;
  postList: NotionDB[];
};

function Lawn({ postList }: { postList: NotionDB[] }) {
  const [selectYear, setSelectYear] = useState(2024);

  const postListByYear = useMemo(() => {
    function dividePostByYear() {
      const result: {
        [year: number]: DateAndPostList[][];
      } = {};

      [2023, 2024].forEach((year) => {
        const firstDay = new Date(`${year}-01-01`);
        const dayByWeekList: DateAndPostList[][] = Array.from({ length: 7 }, () => []);

        for (let i = 0; i < 366; i++) {
          const currentDate = new Date(firstDay);
          currentDate.setDate(currentDate.getDate() + i);
          const currentDayOfWeek = currentDate.getDay();

          if (i === 0) {
            let emptyCount = currentDayOfWeek - 1;
            while (emptyCount >= 0) {
              // 1/1일 전 날짜는 date x
              dayByWeekList[emptyCount].push({ date: null, postList: [] });
              emptyCount--;
            }
          }

          dayByWeekList[currentDayOfWeek].push(getNotionPostByFullDate(currentDate));
        }

        result[year] = dayByWeekList;
      });

      return result;
    }

    const getNotionPostByFullDate = (currentDate: Date) => {
      const dayOfMonth = currentDate.getDate();
      const monthOfYear = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const formattedDate = `${year}-${monthOfYear < 10 ? "0" + monthOfYear : monthOfYear}-${dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth}`;
      const postListOfNowDate: NotionDB[] = postList.filter((post) => post.properties["Publish date"].date.start === formattedDate);

      return {
        date: formattedDate,
        postList: postListOfNowDate,
      };
    };

    return dividePostByYear();
  }, [postList]);

  const onClickYear = (year: number) => setSelectYear(year);

  return (
    <div className="pb-5 flex">
      <div className="overflow-x-scroll">
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
                {dayByWeek.map(({ postList, date }) => {
                  const postCount = postList.length;
                  if (postList.length > 0) console.log("postList : ", postList);

                  const tooltip = postList.length === 0 ? "없음" : `${postList.length}건\n` + postList.map((post) => post.properties.Name.title[0].plain_text).join("\n");

                  const bgColor = colorListByPostCount[postCount] ?? "bg-green-500";
                  const tdClass = date === null ? "min-w-3.5 h-3.5 m-px" : `${bgColor} rounded min-w-3.5 h-3.5 m-px`;

                  return <td key={date} className={tdClass} title={tooltip}></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col ml-5">
        {[2023, 2024].map((year) => (
          <button
            onClick={() => onClickYear(year)}
            className={`my-.5 text-xs py-2 pl-4 pr-10 rounded-lg ${selectYear === year ? "bg-blue-700" : "text-white/40 hover:bg-gray-300/5 "}`}
            key={`lawn_key_${year}`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Lawn;
