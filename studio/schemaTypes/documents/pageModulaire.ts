import {defineField, defineType} from 'sanity'
import modulesList from '../objects/modules/modulesList'
import {seoField} from '../features/seo'
import StackIcon from '@sanity/icons/Stack'

export default defineType({
  name: 'pageModulaire',
  type: 'document',
  title: 'Page Modulaire',
  icon: StackIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      title: `title`,
      slug: 'slug',
      homePage: 'homePage',
    },
    prepare(selection) {
      const {title, slug, homePage} = selection
      return {
        title: title,
        subtitle: homePage ? 'Home Page' : `/${slug.current}`,
      }
    },
  },

  fields: [
    seoField,
    defineField({
      name: 'homePage',
      type: 'boolean',
      title: 'Homepage? only one',
      group: 'editorial',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
      group: 'editorial',
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL de la page)',
      type: 'slug',
      description:
        'Click GENERATE. URL based on the title (without spaces or any character other than a-z-0-9',
      options: {
        source: `title`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),

    defineField({
      name: 'modules',
      title: 'Modules',
      description: 'Modular content zone (images, textes, lists, clients, etc.)',
      type: 'array',
      of: modulesList,
      group: 'editorial',
    }),
  ],
})
