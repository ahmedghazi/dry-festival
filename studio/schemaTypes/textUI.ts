import {defineField} from 'sanity'
import {FiType} from 'react-icons/fi'
import {getFirstBlockText} from './lib/blockPreview'

export default defineField({
  name: 'textUI',
  title: 'Text',
  type: 'object',
  icon: FiType,
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
        title: title || 'Text UI',
        subtitle: firstText ? `Text UI: ${firstText}` : 'Text UI',
      }
    },
  },
})
