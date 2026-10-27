import React from "react";
import website from "@/app/config/website";
import { Metadata, NextPage } from "next";
import { getPageModulaire } from "@/app/sanity-api/sanity-queries";
import { notFound } from "next/navigation";
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
  const data = await getPageModulaire(slug, false);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

const PageModulaireTemplate: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const data = await getPageModulaire(slug);

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
