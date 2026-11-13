import { Metadata } from "next";
import website from "./config/website";
import { JSX } from "react/jsx-runtime";
import ContentModulaire from "./components/ContentModulaire";
import { getHome } from "./sanity-api/sanity-queries";
import { ModulesList } from "./sanity-api/types/extra-types";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome(false);
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
  const data = await getHome();
  if (!data) return notFound();

  return (
    <div className='template template--home' data-template='home'>
      {/* <ContentLanding /> */}
      <ContentModulaire input={(data.modules ?? []) as ModulesList} />
    </div>
  );
};

export default PageLanding;
