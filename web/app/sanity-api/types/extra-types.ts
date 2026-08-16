import {
  CardText,
  DryWaterUI,
  FormUI,
  GridCardTextUI,
  ImageTextUI,
  ListCardsImageUI,
  NewsletterUI,
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
