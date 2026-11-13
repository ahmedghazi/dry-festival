import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6m8quf4y',
    dataset: 'production',
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || 'backoffice--dry-festival', // Visit https://www.sanity.io/docs/environment-variables to leanr more about using environment variables for local & production.
  deployment: {
    autoUpdates: true,
    appId: 'qgu3j43hp0rqspmjc0ukwho2',
  },
  schemaExtraction: {
    enabled: true,
  },
  typegen: {
    path: '../web/app/sanity-api/*.{ts,tsx}',
    generates: '../web/app/sanity-api/types/sanity.types.ts',
    overloadClientMethods: true,
  },
})
