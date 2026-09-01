import {defineField, defineArrayMember} from 'sanity'
import {FiColumns} from 'react-icons/fi'
import {getFirstBlockText} from './lib/blockPreview'

export default defineField({
  name: 'textSplitUI',
  title: 'Text Split',
  type: 'object',
  icon: FiColumns,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'texts',
      title: 'Texts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'textItem',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'blockContent',
            }),
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare(selection) {
              const {text} = selection
              return {
                title: getFirstBlockText(text) || 'Text',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'footerText',
      type: 'text',
      title: 'Footer Text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      texts: 'texts',
      media: 'image',
    },
    prepare(selection) {
      const {title, texts, media} = selection
      const firstText = (texts || [])
        .map((item: any) => getFirstBlockText(item?.text))
        .find(Boolean)
      return {
        title: title || 'Text UI',
        subtitle: firstText ? `Text Split UI: ${firstText}` : 'Text Split UI',
        media,
      }
    },
  },
})
