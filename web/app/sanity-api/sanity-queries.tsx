import { sanityFetch } from "./sanity.live";
import { modules, seo } from "./fragments";
import { defineQuery } from "next-sanity";
import type {
  SETTINGS_QUERY_RESULT,
  HOME_QUERY_RESULT,
  PAGE_MODULAIRE_QUERY_RESULT,
} from "./types/sanity.types";

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
  ...,
  navPrimary[]{
    ...,
    _type == 'linkInternal' => {
      ...,
      link->{
        homePage,
        _type,
        slug
      }
    }
  },
  contact,
  contactText,
}`);

export async function getSettings(): Promise<SETTINGS_QUERY_RESULT> {
  const { data } = await sanityFetch({ query: SETTINGS_QUERY });
  return data;
}

/**
 * HOME
 *
 */
export const HOME_QUERY =
  defineQuery(`*[_type == "pageModulaire" && homePage == true][0]{
  ...,
  seo{
    ${seo}
  },

  modules[]{
    ${modules}
  }
}`);

// stega: false for strings that end up outside the DOM (metadata, <title>…)
export async function getHome(stega?: boolean): Promise<HOME_QUERY_RESULT> {
  const { data } = await sanityFetch({ query: HOME_QUERY, stega });
  return data;
}

/**
 * HOME
 *
 */
export const PAGE_MODULAIRE_QUERY =
  defineQuery(`*[_type == "pageModulaire" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },

  modules[]{
    ${modules}
  }
}`);

export async function getPageModulaire(
  slug: string,
  stega?: boolean,
): Promise<PAGE_MODULAIRE_QUERY_RESULT> {
  const { data } = await sanityFetch({
    query: PAGE_MODULAIRE_QUERY,
    params: { slug: slug },
    stega,
  });
  return data;
}
