import {defineField} from 'sanity'
import {FiImage} from 'react-icons/fi'

export default defineField({
  name: 'illustrationUI',
  title: 'Illustration',
  type: 'object',
  icon: FiImage,
  fields: [
    defineField({
      name: 'imageDesktop',
      title: 'Desktop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageMobile',
      title: 'Mobile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      image: 'imageDesktop',
    },
    prepare(selection) {
      const {image} = selection
      return {
        title: 'Illustration UI',
        subtitle: 'Illustration UI',
        media: image,
      }
    },
  },
})
