import PostList from "@/app/blog/components/postList";
import PostTagList from "@/components/postTagList";
import { Suspense } from "react";

export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      {/* <PostTagList /> */}

      {props.children}
    </div>
  );
}
