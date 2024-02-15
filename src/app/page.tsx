import wrapPromise from "@/utils/wrapPromise";
import Lawn from "@/components/lawn";
import { NotionDB } from "@/types/notion";
import { Suspense } from "react";
import PostList from "@/components/postList";
const { Client } = require("@notionhq/client");

function fetchNotion() {
  const notion = new Client({ auth: process.env.NOTION_INTEGRATION_KEY });
  const promise = notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
  });

  return wrapPromise(promise);
}

const resource = fetchNotion();

export default function Page() {
  const notionPostList: any = resource.read();

  const postList: NotionDB[] = notionPostList.results
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
      <Suspense fallback={<h1>잔디밭 생성중</h1>}>
        <Lawn postList={postList}></Lawn>
      </Suspense>
      <hr />
      <Suspense fallback={<h1>블로그 생성중</h1>}>
        <PostList postList={postList} />
      </Suspense>
    </section>
  );
}
