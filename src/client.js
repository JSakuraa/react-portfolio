import { createClient } from '@sanity/client'

export default createClient({
  projectId: 'dbnnjc3i',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
