import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
})
