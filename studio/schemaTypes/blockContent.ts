import {defineArrayMember, defineField, defineType} from 'sanity'
import {BiText} from 'react-icons/bi'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  icon: BiText,
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [{title: 'Strong', value: 'strong'}],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'newsletterForm',
    }),
  ],
})
