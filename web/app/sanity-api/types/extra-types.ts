import {
  CardText,
  DryWaterUI,
  FormUI,
  GridCardTextUI,
  ImageTextUI,
  ListCardsImageUI,
  NewsletterUI,
  SanityImageAsset,
  TextSplitUI,
  TextUI,
} from "./sanity.types";

export type SanityKeyed<T> = T & { _key: string };

export type ModulesList = Array<
  | SanityKeyed<DryWaterUI>
  | SanityKeyed<TextUI>
  | SanityKeyed<FormUI>
  | SanityKeyed<GridCardTextUI>
  | SanityKeyed<ListCardsImageUI>
  | SanityKeyed<TextSplitUI>
  | SanityKeyed<ImageTextUI>
  | SanityKeyed<NewsletterUI>
>;

export type CardTextItem = SanityKeyed<CardText>;

// creditLine is added to image assets by sanity-plugin-media (not in schema, so typegen can't see it)
export type SanityImageAssetExpanded = SanityImageAsset & {
  creditLine?: string | null;
};
