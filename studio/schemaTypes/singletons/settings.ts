import CogIcon from '@sanity/icons/Cog'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Réglages (header, footer, ...)',
  type: 'document',
  icon: CogIcon,
  groups: [
    // {
    //   default: true,
    //   name: 'navigation',
    //   title: 'Navigation',
    // },
    {
      default: true,
      name: 'seo',
      title: 'Default SEO',
    },
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'misc',
      title: 'Misc',
    },
    {
      name: 'design',
      title: 'Design',
    },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      group: 'header',
    }),

    defineField({
      name: 'baseline',
      title: 'Baseline',
      type: 'text',
      group: 'header',
    }),
    defineField({
      name: 'navPrimary',
      title: 'Naviguation Primary',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'navSocial',
      title: 'Naviguation Social',
      type: 'array',
      of: [
        {
          type: 'linkIcon',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'navSecondary',
      title: 'Naviguation Secondary',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      group: 'footer',
      hidden: true,
    }),

    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'contactText',
      title: 'Contact text',
      type: 'blockContent',
      group: 'footer',
    }),
    // defineField({
    //   name: 'logos',
    //   title: 'Logos',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'image',
    //     },
    //   ],
    //   group: 'footer',
    // }),
    // defineField({
    //   name: 'labelNewsletter',
    //   title: 'Label newsletter',
    //   type: 'localeString',
    //   group: 'footer',
    // }),
    // defineField({
    //   name: 'msgNewsletter',
    //   title: 'Message newsletter',
    //   type: 'localeText',
    //   group: 'footer',
    // }),

    defineField({
      name: 'message404',
      title: 'Message 404',
      type: 'blockContent',
      group: 'misc',
    }),

    defineField({
      name: 'customCss',
      type: 'text',
      group: 'design',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Réglages (header, footer, ...)',
      }
    },
  },
})
