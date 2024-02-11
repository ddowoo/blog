import Link from "next/link";
import { Post } from "contentlayer/generated";

export default function PostPreview({ title, subTitle, date, id }: { title: string; subTitle?: string; date: string; id: string }) {
  return (
    <Link href={`/blog/${id}`}>
      <div className="dark:bg-slate-700 bg-slate-200 rounded-md  my-5 p-5  cursor-pointer group">
        <p className="text-xs">{date}</p>
        <h3 className="text-3xl my-1 font-bold group-hover:text-orange-600 ease-out duration-300">{title}</h3>
        <p className="text-gray-500">{subTitle ?? ""}</p>
      </div>
    </Link>
  );
}
