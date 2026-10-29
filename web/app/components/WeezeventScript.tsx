import Script from "next/script";

const WeezeventScript = () => {
  return (
    <Script
      defer
      src='https://widget.weezevent.com/weez.js'
      strategy='afterInteractive'
    />
  );
};

export default WeezeventScript;
