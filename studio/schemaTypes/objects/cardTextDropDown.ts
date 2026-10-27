import {defineField} from 'sanity'
import {FiCreditCard} from 'react-icons/fi'
import {getFirstBlockText} from './modules/lib/blockPreview'
import colors from '../misc/colors'

export default defineField({
  name: 'cardTextDropDown',
  title: 'Card Text DropDown',
  type: 'object',
  icon: FiCreditCard,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      options: {
        list: colors,
      },
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
      color: 'color',
    },
    prepare(selection) {
      const {title, text, color} = selection
      const firstText = getFirstBlockText(text)
      return {
        title: title || 'Card Text',
        subtitle: firstText || (color ? `Color: ${color}` : ``),
      }
    },
  },
})
