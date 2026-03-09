import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short tagline or subtitle (e.g., "Building the future, one line at a time")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      description: 'Technologies and tools you work with',
      of: [
        {
          type: 'object',
          name: 'technology',
          title: 'Technology',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              description: 'e.g., "Frontend", "Backend", "Database", "DevOps", "Tools"',
              options: {
                list: [
                  { title: 'Frontend', value: 'Frontend' },
                  { title: 'Backend', value: 'Backend' },
                  { title: 'Database', value: 'Database' },
                  { title: 'DevOps', value: 'DevOps' },
                  { title: 'Mobile', value: 'Mobile' },
                  { title: 'Tools', value: 'Tools' },
                  { title: 'Languages', value: 'Languages' },
                  { title: 'Frameworks', value: 'Frameworks' },
                  { title: 'Other', value: 'Other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'svgIcon',
              title: 'SVG Icon',
              type: 'text',
              description: 'Paste the SVG code for the technology icon (including the <svg> tags)',
              rows: 6,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'category',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
