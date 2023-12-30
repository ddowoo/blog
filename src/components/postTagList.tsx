"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { allPosts } from "contentlayer/generated";

export default function PostTagList() {
  const queryParams = useSearchParams();
  const selectedCategory = queryParams.get("category") || "";
  const currentPathname = usePathname();
  const blogContents = currentPathname.split("/blog/")[1];

  if (typeof blogContents === "string") {
    return null;
  }

  const uniqueCategories = new Set<string>(allPosts.map((post) => post.title.split("|")[0].trim()));

  const categoryList: string[] = ["", ...Array.from(uniqueCategories)];

  return (
    <aside className="xl:-translate-x-40 xl:w-40 xl:fixed xl:top-40 flex flex-wrap xl:flex-col mb-5">
      {categoryList.map((category) => (
        <Link
          href={`/blog/?category=${category}`}
          className={`transition duration-300 mx-3 font-semibold py-2 px-4  text-xs hover:dark:bg-slate-700 ${category === selectedCategory && "bg-slate-200 dark:bg-slate-700 "}   rounded-md`}
          title={category}
          key={category}
          type="button"
        >
          {category === "" ? "전체보기" : category}
        </Link>
      ))}
    </aside>
  );
}
