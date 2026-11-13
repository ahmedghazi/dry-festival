import {defineField} from 'sanity'
import {FiSend} from 'react-icons/fi'

export default defineField({
  name: 'newsletterForm',
  title: 'Newsletter Form',
  type: 'object',
  icon: FiSend,
  fields: [],
  preview: {
    prepare() {
      return {
        title: 'Newsletter Form',
        subtitle: 'Embedded newsletter form',
      }
    },
  },
})
