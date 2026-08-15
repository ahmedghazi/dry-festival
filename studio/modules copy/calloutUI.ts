import {defineField} from 'sanity'
import {FiMessageSquare} from 'react-icons/fi'

export default defineField({
  name: 'calloutUI',
  title: 'Callout',
  type: 'object',
  icon: FiMessageSquare,
  fields: [
    defineField({
      name: 'title',
      type: 'localeText',
      title: 'Title',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      title: 'Text',
    }),
    defineField({
      name: 'link',
      type: 'linkExternal',
      title: 'Link',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Callout UI',
        subtitle: 'Callout UI',
      }
    },
  },
})
