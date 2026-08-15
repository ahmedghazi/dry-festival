import {defineField} from 'sanity'
import {BiDrink} from 'react-icons/bi'

export default defineField({
  name: 'tutoUI',
  title: 'Tutos Picolle',
  type: 'object',
  icon: BiDrink,
  initialValue: {
    suptitle: 'TUTOPICOLE',
  },
  fields: [
    defineField({
      name: 'suptitle',
      type: 'string',
      title: 'Sup Title',
      description: 'TUTOPICOLE',
    }),
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    // defineField({
    //   name: 'random',
    //   type: 'boolean',
    // }),
    defineField({
      name: 'tuto',
      title: 'Tutorials',
      description: "Si 1 tuto: l'affichera, si plusieurs: affichera 1 tuto random dans cette liste",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'recipe'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Tuto UI',
        subtitle: 'Tuto UI',
      }
    },
  },
})
