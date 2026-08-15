import {defineField} from 'sanity'
import {FiColumns} from 'react-icons/fi'
import {getFirstBlockText} from './lib/blockPreview'

export default defineField({
  name: 'textSplitUI',
  title: 'Text Split',
  type: 'object',
  icon: FiColumns,
  fields: [
    defineField({
      name: 'texts',
      type: 'array',
      title: 'Texts',
      of: [{type: 'blockContent'}],
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
      type: 'string',
      title: 'Footer Text',
    }),
  ],
  preview: {
    select: {
      texts: 'texts',
      media: 'image',
    },
    prepare(selection) {
      const {texts, media} = selection
      const firstText = (texts || []).map((blocks: any) => getFirstBlockText(blocks)).find(Boolean)
      return {
        title: 'Text Split UI',
        subtitle: firstText ? `Text Split UI: ${firstText}` : 'Text Split UI',
        media,
      }
    },
  },
})
