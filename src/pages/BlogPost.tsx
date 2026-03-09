import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { sanityClient, urlFor } from "../lib/sanity";
import { portableTextComponents } from "../lib/portableText";
import { PageLoading, SEO, ArticleStructuredData } from "../components";
import type { SinglePostData } from "../types/sanity";

export default function BlogPost() {
  const [post, setPost] = useState<SinglePostData | null>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    sanityClient
      .fetch<SinglePostData[]>(
        `*[slug.current == "${slug}"]{
          title,
          _id,
          slug,
          publishedAt,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          body,
          "name": author->name,
          "authorImage": author->image
        }`,
      )
      .then((data) => setPost(data[0] ?? null))
      .catch(console.error);
  }, [slug]);

  if (!post) return <PageLoading />;

  return (
    <>
      <SEO
        title={post.title}
        description={`Read ${post.title} by ${post.name}`}
        url={`/blog/${post.slug.current}`}
        image={post.mainImage.asset.url}
        type="article"
        author={post.name}
      />
      <ArticleStructuredData
        title={post.title}
        description={`Article by ${post.name}`}
        image={post.mainImage.asset.url}
        url={`/blog/${post.slug.current}`}
        authorName={post.name}
      />
      <main className="min-h-screen p-12 bg-primary">
        <article className="container mx-auto rounded-lg shadow-lg bg-orange">
          <header className="relative">
            <div className="absolute flex items-center justify-center w-full h-full p-8">
              <div className="p-12 bg-opacity-75 rounded bg-light">
                <h1 className="mb-4 text-3xl text-white cursive lg:text-6xl">
                  {post.title}
                </h1>
                <div className="flex justify-center text-orange">
                  <img
                    src={urlFor(post.authorImage).url()}
                    alt={post.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="flex items-center pl-2 text-2xl cursive">
                    {post.name}
                  </p>
                </div>
              </div>
            </div>
            <img
              src={post.mainImage.asset.url}
              alt={post.title}
              className="object-cover w-full rounded-t"
              style={{ height: "400px" }}
            />
          </header>
          <div className="max-w-full px-16 py-12 prose lg:px-48 lg:py-20 lg:prose-xl">
            {post.body && (
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            )}
          </div>
        </article>
      </main>
    </>
  );
}
