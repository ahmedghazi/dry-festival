// import supportedLanguages from "../locale/supportedLanguages";
// import {baseLanguage} from '../locale/supportedLanguages'
import {defineField} from 'sanity'

export default defineField({
  title: 'Link image',
  name: 'linkIcon',
  type: 'object',
  preview: {
    select: {
      label: `label`,
      media: 'icon',
      link: 'link',
    },
    prepare(selection) {
      const {label, media, link} = selection
      return {
        title: label,
        media: media,
        subtitle: link,
      }
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
    defineField({
      name: 'icon',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: "Taile de l'image en %)",
      type: 'number',
      validation: (Rule) => Rule.min(0).max(2),
      description: 'Size in % (0 -> 2) ex: 1.5 = 150%',
    }),
  ],
})
