import { defineLive } from "next-sanity/live";
import { client } from "./sanity.client";
import { token } from "./sanity.api";

// Centralise le fetch : perspective + stega (click-to-edit) + live updates,
// pilotés automatiquement par le draftMode de Next.
// <SanityLive /> (layout) revalidates the pages on publish, no webhook needed.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
