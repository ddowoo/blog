import wrapPromise from "@/utils/wrapPromise";
import PostPreview from "@/components/postPreview";

const { Client } = require("@notionhq/client");

function fetchNotion() {
  const notion = new Client({ auth: process.env.NOTION_INTEGRATION_KEY });
  const promise = notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
  });

  return wrapPromise(promise);
}

const resource = fetchNotion();

const PostList = async () => {
  const notionPostList: any = resource.read();

  const blogPostList = notionPostList.results
    .filter((notionPost: any) => {
      console.log(notionPost);
      console.log("포스팅");

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

  return (
    <>
      {blogPostList.map((notionPost: any) => {
        const id = notionPost.id;
        const date = notionPost?.properties["Publish date"]?.date?.start ?? "날짜 없음";
        const title = notionPost.properties.Name.title[0].plain_text;

        return <PostPreview key={id} title={title} date={date} id={id}></PostPreview>;
      })}
    </>
  );
};

export default PostList;
