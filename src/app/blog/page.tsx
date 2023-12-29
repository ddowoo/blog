"use client";
import PostCard from "@/components/postPreview";
import { allPosts } from "contentlayer/generated";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Blog() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category")?.toLocaleLowerCase() ?? "";
  const [searchText, setSearchText] = useState("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value.toLocaleLowerCase());

  return (
    <section>
      <div className="my-5">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
          </span>
          <input
            className="dark:bg-slate-700 bg-slate-200  placeholder:text-slate-400 border-transparent focus:border-transparent focus:ring-0 block  w-full rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="검색어를 입력하세요."
            type="text"
            name="search"
            onChange={onChangeSearch}
          />
        </label>
      </div>
      <hr />
      {allPosts
        .filter((post) => {
          const postCategory = post.title.split("|")[0].trim().toLowerCase();
          return postCategory.includes(category);
        })
        .filter((post) => {
          return post.title.toLocaleLowerCase().includes(searchText);
        })
        .sort((now, prev) => Number(prev.date.split("-").join("")) - Number(now.date.split("-").join("")))
        .map((post) => {
          return <PostCard key={post.title} post={post} />;
        })}
    </section>
  );
}
