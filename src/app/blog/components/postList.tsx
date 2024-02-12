import PostPreview from "@/components/postPreview";
import { NotionDB } from "@/types/notion";

const PostList = async ({ blogPostList }: { blogPostList: NotionDB[] }) => {
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
