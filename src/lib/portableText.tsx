import type { PortableTextComponents } from '@portabletext/react'
import getYouTubeID from 'get-youtube-id'
import { urlFor } from './sanity'
import { CodeBlock, type CodeBlockValue } from '../components/ui'
import type { YouTubeEmbed } from '../types/sanity'

interface ImageValue {
  asset?: {
    _ref?: string
  }
  alt?: string
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          src={urlFor(value).url()}
          alt={value.alt ?? ''}
          className="rounded-lg my-4"
        />
      )
    },
    youtube: ({ value }: { value: YouTubeEmbed }) => {
      const id = getYouTubeID(value.url)
      if (!id) return null
      return (
        <div className="aspect-video my-4">
          <iframe
            title="YouTube Video"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    },
    code: ({ value }: { value: CodeBlockValue }) => {
      if (!value?.code) return null
      return <CodeBlock value={value} />
    },
  },
}
