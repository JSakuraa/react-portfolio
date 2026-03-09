import { createClient } from '@sanity/client'
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'dbnnjc3i',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export default sanityClient
