import {defineField} from 'sanity'
import {BsFileRichtext} from 'react-icons/bs'

export default defineField({
  name: 'textImageUI',
  title: 'Text Image',
  type: 'object',
  icon: BsFileRichtext,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    defineField({
      name: 'look',
      type: 'string',
      options: {
        list: [
          {title: '1/3', value: '1/3'},
          {title: '1/3 alt (text in 2 cols)', value: '1/3-alt'},
          {title: '2/3', value: '2/3'},
          {title: '1/2', value: '1/2'},
        ],
      },
    }),
    defineField({
      name: 'reverse',
      type: 'boolean',
      title: 'Reverse',
      description: 'Image à droite, texte à gauche',
    }),
    defineField({
      name: 'subtitle',
      type: 'linkExternal',
      title: 'Subtitle',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      title: 'Text',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      image: 'image',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title || 'Text Image UI',
        subtitle: 'Text Image UI',
        media: image,
      }
    },
  },
})
