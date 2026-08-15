import {defineField} from 'sanity'
import {BiDrink} from 'react-icons/bi'

export default defineField({
  name: 'tuto',
  title: 'Tutorial',
  type: 'object',
  icon: BiDrink,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      title: 'Text',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Images',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      media: 'coverImage',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Tutorial',
        subtitle: 'Tuto',
        media: media,
      }
    },
  },
})
