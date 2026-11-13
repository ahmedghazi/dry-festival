import Script from "next/script";

const GAScript = () => {
  //<script type="text/javascript" src="https://widget.weezevent.com/weez.js"  async defer></script>
  return (
    <>
      <Script
        defer
        src='https://www.googletagmanager.com/gtm.js?id=GTM-PM7VJJJ3'
        strategy='afterInteractive'
      />
      <Script id='google-analytics'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        `}
      </Script>
    </>
  );
};

export default GAScript;
