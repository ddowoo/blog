"use client";
import { Post, allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export default function Post({ params: { slug } }: { params: { slug: string } }) {
  const post = allPosts.find(({ _raw: { flattenedPath } }) => flattenedPath === slug) as Post;

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      {/* <Head>
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content="https://maintainhoon.vercel.app" />
        <meta property="og:image" content="https://maintainhoon.vercel.app/images/metaLogo.png" />
      </Head> */}
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
