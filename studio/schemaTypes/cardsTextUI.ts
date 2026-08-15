import {defineField} from 'sanity'
import {FiLayers} from 'react-icons/fi'
import {getFirstBlockText} from './lib/blockPreview'

export default defineField({
  name: 'cardsTextUI',
  title: 'Cards Text',
  type: 'object',
  icon: FiLayers,
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
    defineField({
      name: 'items',
      type: 'array',
      title: 'Cards',
      of: [{type: 'cardText'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text',
      media: 'image',
    },
    prepare(selection) {
      const {title, text, media} = selection
      const firstText = getFirstBlockText(text)
      return {
        title: title || 'Cards Text UI',
        subtitle: firstText ? `Cards Text UI: ${firstText}` : 'Cards Text UI',
        media,
      }
    },
  },
})
