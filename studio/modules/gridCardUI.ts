import {defineField} from 'sanity'
import {FiGrid} from 'react-icons/fi'

export default defineField({
  name: 'gridCardUI',
  title: 'Grid Card',
  type: 'object',
  icon: FiGrid,
  initialValue: {
    size: 3,
  },
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    defineField({
      name: 'size',
      type: 'number',
      title: 'Taille',
      description: "Nombre d'éléments par ligne",
    }),
    defineField({
      name: 'link',
      type: 'linkInternal',
      title: 'Link',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Cards',
      of: [{type: 'card'}],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Grid Card UI',
        subtitle: 'Grid Card UI',
      }
    },
  },
})
