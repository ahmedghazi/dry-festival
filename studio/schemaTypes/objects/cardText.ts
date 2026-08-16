import {defineField} from 'sanity'
import {FiCreditCard} from 'react-icons/fi'
import {getFirstBlockText} from './modules/lib/blockPreview'
import colors from '../misc/colors'

export default defineField({
  name: 'cardText',
  title: 'Card Text',
  type: 'object',
  icon: FiCreditCard,
  fields: [
    defineField({
      name: 'title',
      type: 'text',
      title: 'Title',
      rows: 2,
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
      name: 'colSize',
      type: 'number',
      title: 'Taille de la carte',
      options: {
        list: [
          {
            title: 'SM',
            value: 3,
          },
          {
            title: 'MD',
            value: 6,
          },
          {
            title: 'LG',
            value: 12,
          },
        ],
      },
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
      title: 'Text',
    }),
    defineField({
      name: 'footerText',
      type: 'string',
      title: 'Footer Text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text',
      color: 'color',
      colSize: 'colSize',
    },
    prepare(selection) {
      const {title, text, color, colSize} = selection
      const firstText = getFirstBlockText(text)
      return {
        title: (title || 'Card Text') + ` (Col size: ${colSize})`,
        subtitle: firstText || (color ? `Color: ${color}` : `Col size: ${colSize}`),
      }
    },
  },
})
