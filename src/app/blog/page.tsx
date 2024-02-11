import { ChangeEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import wrapPromise from "@/utils/wrapPromise";
import PostList from "./components/postList";
import Lawn from "@/components/lawn";
import { NotionDB } from "@/types/notion";
const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");

function fetchNotion() {
  const notion = new Client({ auth: process.env.NOTION_INTEGRATION_KEY });
  const promise = notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
  });

  return wrapPromise(promise);
}

const resource = fetchNotion();

export default function Blog() {
  const notionPostList: any = resource.read();

  const blogPostList: NotionDB[] = notionPostList.results
    .filter((notionPost: any) => {
      const isBlog = notionPost?.properties["Type of content"]?.select?.name === "Blog" ?? false;
      const isDone = notionPost?.properties["Status"]?.status?.name === "완료" ?? false;
      const isHaveDate = typeof notionPost?.properties["Publish date"]?.date?.start === "string" ?? false;

      return isBlog && isDone && isHaveDate;
    })
    .sort((a: any, b: any) => {
      const aTime = a?.properties["Publish date"]?.date?.start;
      const bTime = b?.properties["Publish date"]?.date?.start;

      const aa = new Date(aTime);
      const bb = new Date(bTime);

      return Number(bb) - Number(aa);
    });

  const allPostList: NotionDB[] = notionPostList.results
    .filter((notionPost: any) => {
      const isDone = notionPost?.properties["Status"]?.status?.name === "완료" ?? false;
      const isHaveDate = typeof notionPost?.properties["Publish date"]?.date?.start === "string" ?? false;

      return isDone && isHaveDate;
    })
    .sort((a: any, b: any) => {
      const aTime = a?.properties["Publish date"]?.date?.start;
      const bTime = b?.properties["Publish date"]?.date?.start;

      const aa = new Date(aTime);
      const bb = new Date(bTime);

      return Number(bb) - Number(aa);
    });

  return (
    <section>
      {/* <div className="mb-5">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
          </span>
          <input
            className="dark:bg-slate-700 bg-slate-200  placeholder:text-slate-400 border-transparent focus:border-transparent focus:ring-0 block  w-full rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="검색어를 입력하세요."
            type="text"
            name="search"
            onChange={onChangeSearch}
          />
        </label>
      </div> */}
      <Lawn postList={allPostList}></Lawn>
      <hr />
      {/* <Suspense fallback={<div className="my-2 m-auto">👏 뭔가 더 가져오는 중</div>}>
        <PostList />
      </Suspense> */}
    </section>
  );
}
