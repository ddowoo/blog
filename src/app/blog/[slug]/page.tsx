import { Post } from "contentlayer/generated";

// export const generateMetadata = ({ params: { slug } }: { params: { slug: string } }): Metadata => {

//   return {
//     title: slug,
//     description: slug,
//     metadataBase: new URL("https://www.ddowoo.blog"),
//   };
// };

const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
import { remark } from "remark";
import html from "remark-html";

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
      <article className="markdown-body bg-slate-800">
        <div className="bg-slate-800 p-5" dangerouslySetInnerHTML={{ __html: mdx }} />
      </article>
    </>
  );
}
