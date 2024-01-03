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

const PostList = () => {
  const notionPostList = resource.read();

  // const userList = awa

  return <h2 style={{ opacity: 0 }}>노션포스트</h2>;
};

export default PostList;
