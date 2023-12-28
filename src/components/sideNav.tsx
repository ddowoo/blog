import { Post, allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function SideNav() {
  const categoryList: string[] = [];
  allPosts.forEach((post) => {
    const category = post.title.split("|")[0].trim();
    if (categoryList.includes(category) === false) categoryList.push(category);
  });

  return (
    <aside className="fixed top-40 left-0 right-0 flex flex-col">
      {categoryList.map((category) => {
        return (
          <Link href={`?category=${category}`} className="text-white mr-3 font-semibold py-2 px-4  text-xs  " title={category} key={category} type="button">
            {category}
          </Link>
        );
      })}
    </aside>
  );
}
