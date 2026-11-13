import { sanityFetch } from "./sanity.live";
import { modules, seo } from "./fragments";
import { defineQuery } from "next-sanity";

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
  navSecondary[]{
    ...,
    _type == 'linkInternal' => {
      ...,
      link->{
        homePage,
        _type,
        slug
      }
    },
    _type == 'linkIcon' => {
      ...,
      icon{
        ...,
        asset->{
          _id,
          url,
          metadata{
            dimensions
          }
        }
      }
    }
  },
  contact,
  contactText,
}`);

export async function getSettings() {
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
export async function getHome(stega?: boolean) {
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
) {
  const { data } = await sanityFetch({
    query: PAGE_MODULAIRE_QUERY,
    params: { slug: slug },
    stega,
  });
  return data;
}
