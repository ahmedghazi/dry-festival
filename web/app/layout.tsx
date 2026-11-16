import "./global.css";
import "./styles/index.scss";
import website from "./config/website";
import { PageContextProvider } from "./context/PageContext";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
// import Cursor from "./components/ui/Cursor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ViewTransition } from "react";
import { getSettings } from "./sanity-api/sanity-queries";
import { SanityLive } from "./sanity-api/sanity.live";
import WeezeventScript from "./components/WeezeventScript";
import ScriptGA from "./components/ScriptGA";
import ScriptMetaPixel from "./components/ScriptMetaPixel";

export const metadata = {
  metadataBase: new URL(website.url),
  title: {
    template: `%s — ${website.title}`,
  },
  description: website.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  const settings = await getSettings();
  return (
    <html lang='fr'>
      <body className='is-loading' data-theme='theme-xyz'>
        <div id='page'>
          <PageContextProvider>
            <Header settings={settings} />
            <ViewTransition>
              <main>{children}</main>
            </ViewTransition>

            <Footer settings={settings} />
            <WeezeventScript />
            <ScriptGA />
            <ScriptMetaPixel />
            <SanityLive />
            {isEnabled && <VisualEditing zIndex={1000} />}
          </PageContextProvider>
        </div>
      </body>
    </html>
  );
}
