// import {BiDockTop, BiDockBottom} from 'react-icons/bi'
// import {ControlsIcon} from '@sanity/icons'

import {ListItemBuilder} from 'sanity/structure'

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return !['pageModulaire', 'media.folder', 'media.tag', 'settings'].includes(id)
}

export const structure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Pages')
        .schemaType('pageModulaire')
        .child(S.documentTypeList('pageModulaire')),
      S.divider(),

      S.listItem()
        .title('Réglages (naviguation, couleurs, ...)')
        .schemaType('settings')
        .child(
          S.editor()
            .title('Réglages (header, footer, ...)')
            .schemaType('settings')
            .documentId('settings'),
        ),

      // S.divider(),

      // S.divider(),

      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
