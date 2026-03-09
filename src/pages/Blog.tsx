import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sanityClient } from "../lib/sanity";
import { PageLoading, SEO } from "../components";
import type { PostListItem } from "../types/sanity";

export default function Blog() {
  const [posts, setPosts] = useState<PostListItem[] | null>(null);

  useEffect(() => {
    sanityClient
      .fetch<PostListItem[]>(
        `*[_type == "post"] | order(publishedAt desc){
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
            },
            alt
          }
        }`,
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  if (!posts) return <PageLoading />;

  return (
    <>
      <SEO
        title="Blog"
        description="Read articles about development, design, and technology by Justin Nappi."
        url="/blog"
      />
      <main className="min-h-screen p-12 bg-primary">
        <section className="container mx-auto">
          <h1 className="flex justify-center text-5xl cursive text-orange">
            Blog Posts
          </h1>
          <h2 className="flex justify-center mb-12 text-lg text-charcoal">
            Where I post about the things that interest me
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug.current}>
                <Link to={"/blog/" + post.slug.current}>
                  <span className="relative block h-64 leading-snug border-l-8 rounded shadow bg-light border-orange">
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt ?? post.title}
                      className="absolute object-cover w-full h-full rounded-r"
                    />
                    <span className="relative items-end justify-end block h-full pb-4 pr-4">
                      <h3 className="px-3 py-4 text-lg font-bold text-white bg-opacity-75 rounded bg-orange">
                        {post.title}
                      </h3>
                    </span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
