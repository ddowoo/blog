import Utterances from "@/components/uttarences";
import { Post } from "contentlayer/generated";
import { Metadata } from "next";

const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
import { remark } from "remark";
import html from "remark-html";

// export const generateMetadata = ({ params: { slug } }: { params: { slug: string } }): Metadata => {
//   console.log(slug);

//   return {
//     title: "타이틀",
//     description: "설명",
//     metadataBase: new URL("https://www.ddowoo.blog"),
//   };
// };

const fetchMd = async (id: string) => {
  const notion = new Client({ auth: process.env.NOTION_INTEGRATION_KEY });
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(mdblocks);
  const processedContent = await remark().use(html).process(mdString.parent);
  const contentHtml = processedContent.toString();

  return contentHtml;
};

export default async function Post({ params: { slug } }: { params: { slug: string } }) {
  const mdx = await fetchMd(slug);

  return (
    <>
      <header>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.css" rel="stylesheet"></link>
      </header>
      <article className="markdown-body mb-5">
        <div className="bg-gray-900 p-5" dangerouslySetInnerHTML={{ __html: mdx }} />
      </article>
      <Utterances />
    </>
  );
}
