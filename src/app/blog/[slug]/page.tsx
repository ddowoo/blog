import { Post, allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export const generateMetadata = ({ params: { slug } }: { params: { slug: string } }): Metadata => {
  const post = allPosts.find(({ _raw: { flattenedPath } }) => flattenedPath === slug) as Post;
  return {
    title: post.title,
    description: post.description,
    metadataBase: new URL("https://www.ddowoo.blog"),
  };
};

export default function Post({ params: { slug } }: { params: { slug: string } }) {
  const post = allPosts.find(({ _raw: { flattenedPath } }) => flattenedPath === slug) as Post;
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <article className="mx-auto prose">
        <div className="mt-10 pb-10 border-b-2 prose dark:prose-invert">
          <h1 className="mb-16">{post.title}</h1>
          <MDXContent />
        </div>
      </article>
      {/* <Utterances /> */}
    </>
  );
}
