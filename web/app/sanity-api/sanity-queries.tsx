import { sanityFetch } from "./sanity.client";
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
}`);

export async function getSettings(): Promise<SETTINGS_QUERY_RESULT> {
  return sanityFetch({
    query: SETTINGS_QUERY,
    tags: ["settings"],
  });
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

export async function getHome(): Promise<HOME_QUERY_RESULT> {
  return sanityFetch({
    query: HOME_QUERY,
    tags: ["home"],
  });
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
): Promise<PAGE_MODULAIRE_QUERY_RESULT> {
  return sanityFetch({
    query: PAGE_MODULAIRE_QUERY,
    tags: ["pageModulaire"],
    qParams: { slug: slug },
  });
}
