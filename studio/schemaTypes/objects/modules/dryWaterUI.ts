import {defineField} from 'sanity'
import {FiDroplet} from 'react-icons/fi'
import {getFirstBlockText} from './lib/blockPreview'

export default defineField({
  name: 'dryWaterUI',
  title: 'Dry Water',
  type: 'object',
  icon: FiDroplet,
  fields: [
    defineField({
      name: 'text',
      type: 'blockContent',
      title: 'Text',
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare(selection) {
      const {text} = selection
      const firstText = getFirstBlockText(text)
      return {
        title: 'Dry Water UI',
        subtitle: firstText ? `Dry Water UI: ${firstText}` : 'Dry Water UI',
      }
    },
  },
})
