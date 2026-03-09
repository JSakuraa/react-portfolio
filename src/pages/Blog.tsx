import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sanityClient } from '../lib/sanity'
import { PageLoading, SEO } from '../components'
import type { PostListItem } from '../types/sanity'

export default function Blog() {
  const [posts, setPosts] = useState<PostListItem[] | null>(null)

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
        }`
      )
      .then((data) => setPosts(data))
      .catch(console.error)
  }, [])

  if (!posts) return <PageLoading />

  return (
    <>
      <SEO
        title="Blog"
        description="Read articles about development, design, and technology by Justin Nappi."
        url="/post"
      />
      <main className="bg-primary min-h-screen p-12">
        <section className="container mx-auto">
          <h1 className="text-5xl flex justify-center cursive text-orange">Blog Posts</h1>
          <h2 className="text-lg flex justify-center text-white mb-12">
            Where I post about the things that interest me
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug.current}>
                <Link to={'/post/' + post.slug.current}>
                  <span className="block h-64 relative rounded shadow leading-snug bg-light border-l-8 border-orange">
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt ?? post.title}
                      className="w-full h-full rounded-r object-cover absolute"
                    />
                    <span className="block relative h-full justify-end items-end pr-4 pb-4">
                      <h3 className="text-lg font-bold px-3 py-4 bg-orange text-white bg-opacity-75 rounded">
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
  )
}
