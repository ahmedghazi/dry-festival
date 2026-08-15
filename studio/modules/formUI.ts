import {defineField} from 'sanity'
import {FiMail} from 'react-icons/fi'

export default defineField({
  name: 'formUI',
  title: 'Form',
  type: 'object',
  icon: FiMail,
  fields: [
    defineField({
      name: 'formResa',
      type: 'boolean',
      title: 'Form Resa?',
    }),
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    defineField({
      name: 'to',
      type: 'string',
      title: 'Recipient Email',
      description: 'Email address where form submissions will be sent',
    }),
    defineField({
      name: 'subject',
      type: 'string',
      description: 'Objet du mail',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      to: 'to',
    },
    prepare(selection) {
      const {title, to} = selection
      return {
        title: title || 'Form UI',
        subtitle: `Form UI → ${to || 'no recipient'}`,
      }
    },
  },
})
