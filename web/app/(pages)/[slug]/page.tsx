import React from "react";
import website from "@/app/config/website";
import { Metadata, NextPage } from "next";
import {
  getPageModulaire,
  PAGE_MODULAIRE_QUERY,
} from "@/app/sanity-api/sanity-queries";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getClient } from "@/app/sanity-api/sanity.client";
import { PAGE_MODULAIRE_QUERY_RESULT } from "@/app/sanity-api/types/sanity.types";
import ContentModulaire from "@/app/components/ContentModulaire";
import { ModulesList } from "@/app/sanity-api/types/extra-types";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageModulaire(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

const PageModulaireTemplate: NextPage<PageProps> = async ({ params }) => {
  const { isEnabled } = await draftMode();
  const { slug } = await params;

  let data: PAGE_MODULAIRE_QUERY_RESULT;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PAGE_MODULAIRE_QUERY,
      { slug },
    );
  } else {
    data = (await getPageModulaire(slug)) as PAGE_MODULAIRE_QUERY_RESULT;
  }

  if (!data) return notFound();

  return (
    <div
      className='template template--page'
      data-template='page'
      data-slug={data.slug?.current || ""}>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <ContentModulaire input={(data.modules ?? []) as ModulesList} />
    </div>
  );
};

export default PageModulaireTemplate;
