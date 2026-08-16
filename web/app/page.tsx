import { draftMode } from "next/headers";
// import data from "./data.json";
// import { getHome, HOME_QUERY } from "./sanity-api/sanity-queries";
import { Metadata } from "next";
import website from "./config/website";
import { JSX } from "react/jsx-runtime";
import ContentLanding from "./components/ContentLanding";

export async function generateMetadata(): Promise<Metadata> {
  // const data = await getHome();
  // console.log(data.seo);
  return {
    title: website.title,
    description: website.description,
    openGraph: {
      images: website.image,
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
  // const { isEnabled: preview } = draftMode();
  // let data: Home;
  // if (preview) {
  //   data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
  //     HOME_QUERY,
  //     params
  //   );
  // } else {
  //   data = (await getHome()) as Home;
  // }

  // if (!data) return <div>please edit pageLanding</div>;
  return (
    <div className='template template--landing' data-template='landing'>
      <ContentLanding />
    </div>
  );
};

export default PageLanding;
