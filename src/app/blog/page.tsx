"use client";
import PostCard from "@/components/postPreview";
import { allPosts } from "contentlayer/generated";
import { ChangeEvent, useState } from "react";

export default function Blog() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryList: string[] = [];
  allPosts.forEach((post) => {
    const category = post.title.split("|")[0].trim();
    if (categoryList.includes(category) === false) categoryList.push(category);
  });

  const onClickCategory = (category: string) => setSelectedCategory(category.toLocaleLowerCase());

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value.toLocaleLowerCase());

  return (
    <section>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span>
        <input
          className="placeholder:text-slate-400 block bg-transparent w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="게시물 검색"
          type="text"
          name="search"
          onChange={onChangeSearch}
        />
      </label>
      <div className="my-5 d-flex flex-wrap">
        {categoryList.map((category) => {
          return (
            <button onClick={() => onClickCategory(category)} className="text-white mr-3 font-semibold py-2 px-4 border  text-xs rounded-lg " title={category} key={category} type="button">
              {category}
            </button>
          );
        })}
      </div>
      {allPosts
        .filter((post) => post.title.toLocaleLowerCase().includes(selectedCategory))
        .filter((post) => post.title.toLocaleLowerCase().includes(searchText))
        .map((post) => {
          return <PostCard key={post.title} post={post} />;
        })}
    </section>
  );
}
