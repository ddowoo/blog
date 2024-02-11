import PostList from "@/app/blog/components/postList";
import PostTagList from "@/components/postTagList";
import { Suspense } from "react";
import wrapPromise from "@/utils/wrapPromise";
const { Client } = require("@notionhq/client");

function fetchNotion() {
  const notion = new Client({ auth: process.env.NOTION_INTEGRATION_KEY });
  const promise = notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
  });

  return wrapPromise(promise);
}

const resource = fetchNotion();

export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <PostTagList />
      {/* <Suspense fallback={<div className="my-2 m-auto">👏 뭔가 더 가져오는 중</div>}> */}
      {/* <PostList  /> */}
      {/* </Suspense> */}
      {props.children}
    </div>
  );
}
