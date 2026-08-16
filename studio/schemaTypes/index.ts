import pageModulaire from './documents/pageModulaire'
import settings from './singletons/settings'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkIcon from './objects/linkIcon'
import contactLinkItem from './objects/contactLinkItem'
import cta from './objects/cta'
import keyVal from './objects/keyVal'
import cardText from './objects/cardText'

/** modules */
import textUI from './objects/modules/textUI'
import {seoSchema} from './features/seo'
import dryWaterUI from './objects/modules/dryWaterUI'
import formUI from './objects/modules/formUI'
import gridCardTextUI from './objects/modules/gridCardTextUI'
import listCardsImageUI from './objects/modules/listCardsImageUI'
import textSplitUI from './objects/modules/textSplitUI'
import imageTextUI from './objects/modules/imageTextUI'
import newsletterUI from './objects/modules/newsletterUI'

export const schemaTypes = [
  settings,
  pageModulaire,

  seoSchema,
  blockContent,
  linkExternal,
  linkInternal,
  linkIcon,
  contactLinkItem,
  cta,
  keyVal,
  cardText,

  textUI,
  dryWaterUI,
  formUI,
  gridCardTextUI,
  listCardsImageUI,
  textSplitUI,
  imageTextUI,
  newsletterUI,
]
export default schemaTypes
