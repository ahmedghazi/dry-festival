import "./global.css";
import "./styles/index.scss";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import website from "./config/website";
import { PageContextProvider } from "./context/PageContext";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import Cursor from "./components/ui/Cursor";
import Header from "./components/Header";
import { ViewTransition } from "react";

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

  return (
    <html lang='fr'>
      <body className={"is-loading"} data-theme='theme-xyz'>
        <div id='page'>
          {/* <LocaleContextProvider> */}
          <PageContextProvider>
            <Header />
            <ViewTransition>
              <main>{children}</main>
            </ViewTransition>

            {/* <Footer /> */}
            {/* <Cursor size={20} color='#00ff1a' /> */}
            {isEnabled && (
              <VisualEditing
                zIndex={1000} // Optional
              />
            )}
          </PageContextProvider>
          {/* </LocaleContextProvider> */}
        </div>
      </body>
    </html>
  );
}
