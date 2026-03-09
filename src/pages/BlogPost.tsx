import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { sanityClient, urlFor } from '../lib/sanity'
import { portableTextComponents } from '../lib/portableText'
import { PageLoading, SEO, ArticleStructuredData } from '../components'
import type { SinglePostData } from '../types/sanity'

export default function BlogPost() {
  const [post, setPost] = useState<SinglePostData | null>(null)
  const { slug } = useParams<{ slug: string }>()

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
        }`
      )
      .then((data) => setPost(data[0] ?? null))
      .catch(console.error)
  }, [slug])

  if (!post) return <PageLoading />

  return (
    <>
      <SEO
        title={post.title}
        description={`Read ${post.title} by ${post.name}`}
        url={`/post/${post.slug.current}`}
        image={post.mainImage.asset.url}
        type="article"
        author={post.name}
      />
      <ArticleStructuredData
        title={post.title}
        description={`Article by ${post.name}`}
        image={post.mainImage.asset.url}
        url={`/post/${post.slug.current}`}
        authorName={post.name}
      />
      <main className="bg-primary min-h-screen p-12">
        <article className="container shadow-lg mx-auto bg-orange rounded-lg">
          <header className="relative">
            <div className="absolute h-full w-full flex items-center justify-center p-8">
              <div className="bg-light bg-opacity-75 rounded p-12">
                <h1 className="cursive text-3xl lg:text-6xl mb-4 text-white">{post.title}</h1>
                <div className="flex justify-center text-orange">
                  <img
                    src={urlFor(post.authorImage).url()}
                    alt={post.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="cursive flex items-center pl-2 text-2xl">{post.name}</p>
                </div>
              </div>
            </div>
            <img
              src={post.mainImage.asset.url}
              alt={post.title}
              className="w-full object-cover rounded-t"
              style={{ height: '400px' }}
            />
          </header>
          <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </div>
        </article>
      </main>
    </>
  )
}
