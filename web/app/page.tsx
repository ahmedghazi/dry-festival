import { draftMode } from "next/headers";
import { Metadata } from "next";
import website from "./config/website";
import { JSX } from "react/jsx-runtime";
import ContentModulaire from "./components/ContentModulaire";
import { getHome, HOME_QUERY } from "./sanity-api/sanity-queries";
import { getClient } from "./sanity-api/sanity.client";
import { HOME_QUERY_RESULT } from "./sanity-api/types/sanity.types";
import { ModulesList } from "./sanity-api/types/extra-types";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome();
  return {
    title: `${data?.seo?.metaTitle || data?.title || website.title}`,
    description: data?.seo?.metaDescription || website.description,
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

export const revalidate = 3600; // revalidate every hour

type PageLandingProps = {
  params: {
    slug: string;
  };
};

const PageLanding: ({
  params,
}: PageLandingProps) => Promise<JSX.Element> = async () => {
  const { isEnabled } = await draftMode();

  let data: HOME_QUERY_RESULT;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      HOME_QUERY,
    );
  } else {
    data = await getHome();
  }
  if (!data) return notFound();

  return (
    <div className='template template--home' data-template='home'>
      {/* <ContentLanding /> */}
      <ContentModulaire input={(data.modules ?? []) as ModulesList} />
    </div>
  );
};

export default PageLanding;
