import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //ipconfig getifaddr en0
  allowedDevOrigins: ["127.0.0.1", "0,0,0,0", "192.168.1.78"],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      // { hostname: "source.unsplash.com" },
    ],
  },
  env: {
    // KEY_SENDGRID: "LA CLE API",
  },
  compiler: {
    // Enables the styled-components SWC transform
    // styledComponents: true,
  },
};

export default nextConfig;
