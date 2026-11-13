// import {defineField, defineType} from 'sanity'
// import {FolderIcon} from '@sanity/icons'
// import {baseLanguage} from '../locale/supportedLanguages'
// import {MdImage, MdVideoFile} from 'react-icons/md'
// import {seoField} from '../features/seo'

// export default defineType({
//   type: 'document',
//   name: 'project',
//   title: 'Project',
//   icon: FolderIcon,
//   groups: [
//     {
//       default: true,
//       name: 'editorial',
//       title: 'Editorial',
//     },

//     {
//       name: 'meta',
//       title: 'Metadata',
//     },
//     {
//       name: 'seo',
//       title: 'SEO (google, bing, ...',
//     },
//   ],
//   initialValue: {
//     rip: false,
//   },
//   fields: [
//     seoField,
//     defineField({
//       name: 'title',
//       type: 'localeString',
//       title: 'Title',
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       description:
//         'Click GENERATE. URL based on the title (without spaces or any character other than a-z-0-9',
//       options: {
//         source: `title.${baseLanguage}`,
//         maxLength: 96,
//       },
//       validation: (Rule) => Rule.required(),
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'imageCover',
//       type: 'image',
//       title: 'Image Cover',
//       description: 'Visible on liste pages, project cards (1400px width)',
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'videoCover',
//       type: 'video',
//       title: 'video Cover',
//       description: 'Visible on liste pages, project cards',
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'rip',
//       type: 'boolean',
//       title: 'RIP',
//       group: 'meta',
//     }),
//     defineField({
//       name: 'ID',
//       type: 'string',
//       title: 'ID',
//       group: 'meta',
//     }),
//     defineField({
//       name: 'client',
//       title: 'Client',
//       type: 'reference',
//       to: [{type: 'client'}],
//       group: 'meta',
//     }),
//     defineField({
//       name: 'year',
//       type: 'string',
//       title: 'Year',
//       group: 'meta',
//     }),
//     defineField({
//       name: 'location',
//       title: 'Location',
//       type: 'array',
//       of: [{type: 'reference', to: [{type: 'location'}]}],
//       group: 'meta',
//     }),
//     defineField({
//       name: 'locations',
//       title: 'Location(s)',
//       type: 'array',
//       of: [{type: 'reference', to: [{type: 'location'}]}],
//       group: 'meta',
//     }),
//     defineField({
//       name: 'contributions',
//       title: 'Contribution(s)',
//       type: 'array',
//       of: [{type: 'contribution'}],
//       group: 'meta',
//     }),
//     defineField({
//       name: 'services',
//       title: 'Service(s)',
//       type: 'array',
//       of: [{type: 'reference', to: [{type: 'service'}]}],
//       group: 'meta',
//       hidden: true,
//     }),
//     defineField({
//       name: 'metas',
//       title: 'Key values',
//       description: 'For example: "Role: Designer", "Special thanks to: ax, bx, cx"',
//       type: 'array',
//       of: [{type: 'keyVal'}],
//       group: 'meta',
//     }),

//     defineField({
//       name: 'description',
//       title: 'Description',
//       type: 'localeText',
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'text',
//       title: 'Texte',
//       type: 'localeBlockContent',
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'media',
//       type: 'array',
//       of: [
//         {
//           type: 'image',
//           icon: MdImage,
//           initialValue: {
//             colSize: 3,
//           },
//           fields: [
//             defineField({
//               name: 'caption',
//               title: 'Caption',
//               type: 'localeString',
//             }),
//             defineField({
//               name: 'colSize',
//               title: 'Colunn size',
//               type: 'number',
//               description: 'in a 6 column grid (ex: 1, 2, 3)',
//             }),
//           ],
//           // preview: {
//           //   select: {
//           //     title: 'caption.en',
//           //     subtitle: 'colSize',
//           //     media: 'image',
//           //   },
//           // },
//         },
//         // {
//         //   type: 'mux.video',
//         //   icon: MdVideoFile,
//         // },
//         {
//           type: 'video',
//           icon: MdVideoFile,
//           initialValue: {
//             colSize: 3,
//           },
//           preview: {
//             select: {
//               title: 'title.en',
//               subtitle: 'colSize',
//             },
//           },
//         },
//       ],
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'relatedProjects',
//       title: 'Related Projects',
//       type: 'array',
//       of: [{type: 'reference', to: [{type: 'project'}]}],
//       group: 'editorial',
//       hidden: true,
//     }),
//   ],

//   preview: {
//     select: {
//       title: `title.${baseLanguage}`,
//       slug: 'slug',
//       image: 'imageCover',
//       ID: 'ID',
//       clientBackgroundColor: 'client.backgroundColor.hex',
//       clientForegroundColor: 'client.foregroundColor.hex',
//     },
//     prepare(selection) {
//       const {title, slug, image, ID, clientBackgroundColor, clientForegroundColor} = selection
//       // console.log(images)
//       return {
//         title: `${ID} — ${title}`,
//         subtitle: `/prjct/${slug.current}`,
//         // media: image,
//         media: image
//           ? image
//           : () => (
//               <div
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   background: `radial-gradient(circle at center, ${clientBackgroundColor ?? '#e5e7eb'}, ${clientBackgroundColor ?? '#000'})`,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: 20,
//                   fontWeight: 700,
//                   fontSize: 16,
//                   color: clientBackgroundColor ?? '#000',
//                 }}
//               >
//                 {/* {name?.charAt(0).toUpperCase()} */}
//               </div>
//             ),
//       }
//     },
//   },
// })
