// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'

export default defineField({
  name: 'keyVal',
  title: 'Key Value',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      title: 'Key',
    }),
    defineField({
      name: 'val',
      type: 'string',
      title: 'Value',
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
      title: 'Text',
      hidden: true,
    }),
  ],
})
