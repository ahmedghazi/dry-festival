// import supportedLanguages from "../locale/supportedLanguages";
// import {baseLanguage} from '../locale/supportedLanguages'
import {IoTicketOutline} from 'react-icons/io5'
import {defineField} from 'sanity'

export default defineField({
  title: 'linkWeezevent',
  name: 'linkWeezevent',
  type: 'object',
  icon: IoTicketOutline,
  preview: {
    select: {
      label: `label`,
    },
  },
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
  ],
})
