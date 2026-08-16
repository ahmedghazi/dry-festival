import {defineField} from 'sanity'
import {FiGrid} from 'react-icons/fi'
import {getFirstBlockText} from './lib/blockPreview'

export default defineField({
  name: 'gridCardTextUI',
  title: 'Grid Card Text',
  type: 'object',
  icon: FiGrid,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
      title: 'Text',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Cards',
      of: [{type: 'cardText'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text',
    },
    prepare(selection) {
      const {title, text} = selection
      const firstText = getFirstBlockText(text)
      return {
        title: title || 'Grid Card Text UI',
        subtitle: firstText ? `Grid Card Text UI: ${firstText}` : 'Grid Card Text UI',
      }
    },
  },
})
