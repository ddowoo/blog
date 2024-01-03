import PostList from "@/components/postList";
import PostTagList from "@/components/postTagList";
import { Suspense } from "react";

export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <PostTagList />
      <Suspense fallback={<div className="my-2 m-auto">👏 뭔가 더 가져오는 중</div>}>
        <PostList />
      </Suspense>
      {props.children}
    </div>
  );
}
