import {defineField} from 'sanity'
import {FiCreditCard} from 'react-icons/fi'

export default defineField({
  name: 'imageCard',
  title: 'Image Card',
  type: 'object',
  icon: FiCreditCard,
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
      name: 'size',
      type: 'number',
      title: 'Taille sur la grille de 12, 1, 2, ...',
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
