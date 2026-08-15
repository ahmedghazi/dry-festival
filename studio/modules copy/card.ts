import {defineField} from 'sanity'
import {FiCreditCard} from 'react-icons/fi'

export default defineField({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: FiCreditCard,
  initialValue: {
    size: '1/2',
  },
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    // defineField({
    //   name: 'size',
    //   type: 'number',
    //   title: 'Taille sur la grille de 12, 1, 2, ...',
    //   description: "Taille de l'image quand ouvert en overlay",
    // }),
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
      name: 'subtitle',
      type: 'localeString',
      title: 'Subtitle',
    }),
    defineField({
      name: 'description',
      type: 'localeString',
      title: 'Description',
    }),
    defineField({
      name: 'link',
      type: 'array',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
      description: 'Optionnel, Attention 1 seul link par card',
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      description:
        'Si ce champs est rempli, il sera prioritaire sur le champs link et affichera le contenu en popup',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'subtitle.fr',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Card',
        subtitle: subtitle || 'Card',
        media: media,
      }
    },
  },
})
