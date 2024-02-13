"use client";

import PostPreview from "@/components/postPreview";
import { NotionDB } from "@/types/notion";
import { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";

let timer: NodeJS.Timeout | null = null;

const PostList = ({ blogPostList }: { blogPostList: NotionDB[] }) => {
  const [serachKeyword, setSearchKeyword] = useState("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchKeyword(inputValue);
    }, 500);
  };

  return (
    <>
      <div className="bg-slate-700 mt-5 flex items-center rounded-3xl">
        <label htmlFor="post-search-input" className="mx-2 ml-3">
          <IoIosSearch />
        </label>
        <input
          id="post-search-input"
          className="placeholder:text-slate-400 bg-transparent border-transparent focus:border-transparent focus:ring-0 block  w-full py-2 pl-1 pr-3 shadow-sm focus:outline-none focus:border-transparent focus:ring-sky-500  sm:text-sm"
          placeholder="검색어(제목)를 입력하세요."
          type="text"
          name="search"
          onChange={onChangeSearch}
        />
      </div>
      {blogPostList.map((notionPost: any) => {
        const id = notionPost.id;
        const date = notionPost?.properties["Publish date"]?.date?.start ?? "날짜 없음";
        const title = notionPost.properties.Name.title[0].plain_text;
        const isFiltered = title.toLowerCase().includes(serachKeyword.toLowerCase());

        return isFiltered ? <PostPreview key={id} title={title} date={date} id={id}></PostPreview> : <></>;
      })}
    </>
  );
};

export default PostList;
