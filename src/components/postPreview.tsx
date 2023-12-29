import Link from "next/link";
import { Post } from "contentlayer/generated";

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post._raw.flattenedPath}`}>
      <div className="dark:bg-slate-700 bg-slate-200 rounded-md  my-5 p-5  cursor-pointer group">
        <p className="text-xs">{post.date.split("T")[0]}</p>
        <h3 className="text-3xl my-1 font-bold group-hover:text-orange-600 ease-out duration-300">{post.title}</h3>
        <p className="text-gray-500">Android에서 AudioRecord API를 활용한 wav 녹음하기</p>
      </div>
    </Link>
  );
}
