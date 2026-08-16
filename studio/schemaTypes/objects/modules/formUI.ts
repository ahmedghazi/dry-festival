import {defineField} from 'sanity'
import {FiMail} from 'react-icons/fi'

export default defineField({
  name: 'formUI',
  title: 'Form',
  type: 'object',
  icon: FiMail,
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
      name: 'to',
      type: 'string',
      title: 'Recipient Email',
      description: 'Email address where form submissions will be sent',
    }),
  ],
  preview: {
    select: {
      to: 'to',
      media: 'image',
    },
    prepare(selection) {
      const {to, media} = selection
      return {
        title: 'Form UI',
        subtitle: `Form UI → ${to || 'no recipient'}`,
        media,
      }
    },
  },
})
