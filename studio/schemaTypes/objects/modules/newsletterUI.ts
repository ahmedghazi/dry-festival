import {defineField} from 'sanity'
import {FiSend} from 'react-icons/fi'
import {getFirstBlockText} from './lib/blockPreview'

export default defineField({
  name: 'newsletterUI',
  title: 'Newsletter',
  type: 'object',
  icon: FiSend,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
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
        title: title || 'Newsletter UI',
        subtitle: firstText ? `Newsletter UI: ${firstText}` : 'Newsletter UI',
      }
    },
  },
})
