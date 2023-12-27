import Link from "next/link";
import { Post } from "contentlayer/generated";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post._raw.flattenedPath}`}>
      <div className="my-3 py-2  cursor-pointer group">
        <p className="text-xs">{post.date.split("T")[0]}</p>
        <h3 className="text-3xl my-1 font-bold group-hover:text-orange-600 ease-out duration-300">{post.title}</h3>
        <p className="text-gray-500">Android에서 AudioRecord API를 활용한 wav 녹음하기</p>
      </div>
    </Link>
  );
}
