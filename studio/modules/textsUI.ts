import {defineField} from 'sanity'
import {PiTextColumnsLight} from 'react-icons/pi'
import {LocaleBlockContent} from '../../../types/schema'

export default defineField({
  name: 'textsUI',
  title: 'Texts',
  type: 'object',
  icon: PiTextColumnsLight,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Text Items',
      of: [{type: 'localeBlockContent'}],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      items: 'items',
    },
    prepare(selection) {
      const {title, items} = selection
      const blockWithText = (items || []).map((block: LocaleBlockContent) => {
        return block?.fr?.find((block: any) => block._type === 'block')
      })
      const text = (blockWithText || []).find((block: any) => block?._type === 'block')
      const textContent = text?.children
        ?.filter((child: any) => child?._type === 'span')
        ?.map((span: any) => span.text)
        ?.join('')
      return {
        title: title || 'Texts UI',
        subtitle: text ? `Texts UI:  ${textContent}` : 'Texts UI',
      }
    },
  },
})
