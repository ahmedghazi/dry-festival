import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {linkResolverPreview} from './src/linkResolverPreview'
import {colorInput} from '@sanity/color-input'
import {structure} from './src/deskStructure'
import {resolveProductionUrl} from './src/actions/resolveProductionUrl'
import {media} from 'sanity-plugin-media'

// const remoteURL = 'https://dryfestival.com'
const remoteURL = 'https://v1--dryfestrival.netlify.app'
const localURL = 'http://localhost:3000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

const plugins = [
  structureTool({structure}),
  presentationTool({
    title: 'Live preview',
    resolve: linkResolverPreview,
    previewUrl: {
      origin: previewURL,
      previewMode: {
        enable: '/api/preview',
        disable: '/api/exit-preview',
      },
    },
  }),
  media(),
  visionTool(),
  colorInput(),
]

export default defineConfig({
  name: 'default',
  title: 'Dry festival',

  projectId: '6m8quf4y',
  dataset: 'production',

  plugins: plugins,

  schema: {
    types: schemaTypes,
  },
})
