import Script from "next/script";

const WeezeventScript = () => {
  //<script type="text/javascript" src="https://widget.weezevent.com/weez.js"  async defer></script>
  return (
    <Script
      defer
      src='https://widget.weezevent.com/weez.js'
      strategy='afterInteractive'
    />
  );
};

export default WeezeventScript;
