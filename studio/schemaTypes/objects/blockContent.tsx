import {defineType, defineArrayMember, defineField} from 'sanity'
// import { FiExternalLink, LinkIcon } from 'react-icons/fi'
import {FiExternalLink} from 'react-icons/fi'
import linkIntternalTypes from '../misc/linkIntternalTypes'
import LinkIcon from '@sanity/icons/Link'
import {IoTicketOutline} from 'react-icons/io5'
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
const TextL = (props: any): JSX.Element => (
  <span style={{display: 'block', fontSize: '2rem', lineHeight: 1.2}}>{props.children}</span>
)
const HrPreview = (): JSX.Element => (
  <hr style={{border: 0, borderTop: '1px solid currentColor', margin: '0.5rem 0'}} />
)

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        // { title: "Titre H2", value: "h2" },
        // { title: "Titre H3", value: "h3" },
        // {title: 'H4', value: 'h4'},
        // {title: 'Quote', value: 'blockquote'},
        {
          title: 'Texte L',
          value: 'text-lg',
          component: TextL,
        },
        // {
        //   title: "Texte indenté",
        //   value: "text-index",
        //   component: TextIndent,
        // },
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          // {
          //   title: "Underline",
          //   value: "u",
          //   icon: () => "u",
          //   component: Underline,
          // },
          // {
          //   title: "Outline",
          //   value: "outline",
          //   icon: () => "o",
          //   component: Outline,
          // },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Internal link',
            name: 'linkInternal',
            type: 'object',
            icon: LinkIcon,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                weak: true,
                title: 'Reference',
                to: linkIntternalTypes,
              },
              {
                title: 'CTA',
                name: 'cta',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
          {
            title: 'External link',
            name: 'linkExternal',
            type: 'object',
            icon: FiExternalLink,
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'string',
              },
              {
                title: 'CTA',
                name: 'cta',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
          {
            title: 'Weezevent link',
            name: 'linkWeezevent',
            type: 'object',
            icon: IoTicketOutline,
            fields: [
              {
                name: 'link',
                title: 'Link',
                type: 'url',
                hidden: true,
              },
              {
                name: 'url',
                title: 'Link',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.

    defineArrayMember({
      type: 'image',
      // options: {hotspot: true},
    }),

    defineArrayMember({
      type: 'embed',
    }),

    defineArrayMember({
      title: 'Séparateur',
      name: 'hr',
      type: 'object',
      fields: [
        defineField({
          name: 'style',
          type: 'string',
          initialValue: 'line',
          hidden: true,
        }),
      ],
      components: {preview: HrPreview},
      preview: {prepare: () => ({title: 'Séparateur'})},
    }),
  ],
})
