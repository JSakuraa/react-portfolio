import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  author?: string
  noindex?: boolean
}

const SITE_NAME = 'Justin Nappi'
const SITE_URL = 'https://justinnappi.com'
const DEFAULT_DESCRIPTION = 'Justin Nappi - Developer, Designer, Entrepreneur'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  publishedTime,
  author = 'Justin Nappi',
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* OpenGraph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && author && <meta property="article:author" content={author} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

interface PersonStructuredDataProps {
  name: string
  description?: string
  image?: string
  url?: string
  sameAs?: string[]
}

export function PersonStructuredData({
  name,
  description,
  image,
  url = SITE_URL,
  sameAs = [],
}: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description,
    image,
    url,
    sameAs,
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}

interface ArticleStructuredDataProps {
  title: string
  description: string
  image: string
  url: string
  publishedTime?: string
  authorName: string
}

export function ArticleStructuredData({
  title,
  description,
  image,
  url,
  publishedTime,
  authorName,
}: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url: `${SITE_URL}${url}`,
    datePublished: publishedTime,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}

interface ProjectStructuredDataProps {
  title: string
  description: string
  image: string
  url: string
  dateCreated?: string
}

export function ProjectStructuredData({
  title,
  description,
  image,
  url,
  dateCreated,
}: ProjectStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image,
    url: `${SITE_URL}${url}`,
    dateCreated,
    creator: {
      '@type': 'Person',
      name: SITE_NAME,
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
