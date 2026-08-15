import {defineField} from 'sanity'
import {FiImage} from 'react-icons/fi'

export default defineField({
  name: 'imagesUI',
  title: 'Images',
  type: 'object',
  icon: FiImage,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Images',
      of: [{type: 'imageCard'}],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      media: 'items.0',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Images UI',
        subtitle: 'Images UI',
        media: media,
      }
    },
  },
})
