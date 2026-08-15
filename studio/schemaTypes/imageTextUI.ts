import {defineField} from 'sanity'
import {BsFileRichtext} from 'react-icons/bs'
import {getFirstBlockText} from './lib/blockPreview'

export default defineField({
  name: 'imageTextUI',
  title: 'Image Text',
  type: 'object',
  icon: BsFileRichtext,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
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
      name: 'direction',
      type: 'string',
      title: 'Direction',
      options: {
        list: [
          {title: 'Left to right', value: 'ltr'},
          {title: 'Right to left', value: 'rtl'},
        ],
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
        title: title || 'Image Text UI',
        subtitle: firstText ? `Image Text UI: ${firstText}` : 'Image Text UI',
        media,
      }
    },
  },
})
