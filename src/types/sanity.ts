import type { PortableTextBlock } from '@portabletext/types'

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityImageAsset {
  _id: string
  url: string
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanityImageReference {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  description?: string
}

export type TechnologyCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'DevOps'
  | 'Mobile'
  | 'Tools'
  | 'Languages'
  | 'Frameworks'
  | 'Other'

export interface Technology {
  _key: string
  name: string
  category: TechnologyCategory
  svgIcon?: string
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  tagline?: string
  slug: SanitySlug
  image?: SanityImage
  authorImage?: string
  resume?: string
  bio?: PortableTextBlock[]
  technologies?: Technology[]
}

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: SanitySlug
  author?: Author
  mainImage: SanityImage
  categories?: Category[]
  publishedAt?: string
  body?: PortableTextBlock[]
}

export interface PostListItem {
  title: string
  slug: SanitySlug
  mainImage: {
    asset: SanityImageAsset
    alt?: string
  }
}

export interface SinglePostData {
  title: string
  _id: string
  slug: SanitySlug
  mainImage: {
    asset: SanityImageAsset
  }
  body?: PortableTextBlock[]
  name: string
  authorImage: SanityImage
}

export type ProjectType = 'Personal' | 'Work' | 'School'

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: SanitySlug
  date?: string
  place?: string
  description?: string
  projectType?: ProjectType
  link?: string
  mainImage: SanityImage
  tags?: string[]
  body?: PortableTextBlock[]
}

export interface ProjectListItem {
  title: string
  slug: SanitySlug
  date?: string
  place?: string
  description?: string
  projectType?: ProjectType
  link?: string
  tags?: string[]
  mainImage: {
    asset: SanityImageAsset
  }
}

export interface SingleProjectData {
  title: string
  _id: string
  slug: SanitySlug
  place?: string
  link?: string
  projectType?: ProjectType
  mainImage: {
    asset: SanityImageAsset
  }
  body?: PortableTextBlock[]
}

export interface YouTubeEmbed {
  _type: 'youtube'
  url: string
}
