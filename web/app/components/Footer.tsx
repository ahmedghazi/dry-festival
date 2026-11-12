import React from "react";
import { PortableText, stegaClean } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import { SETTINGS_QUERY_RESULT } from "../sanity-api/types/sanity.types";
import { urlFor } from "../sanity-api/sanity-utils";
import Image from "next/image";

type Props = {
  settings: SETTINGS_QUERY_RESULT;
};

const Footer = ({ settings }: Props) => {
  return (
    <footer>
      <div className='inner'>
        <h2 className='text-md md:text-lg '>contact</h2>
        {settings?.contactText && (
          <div className='text'>
            <div className='module__text text'>
              <PortableText
                value={stegaClean(settings?.contactText)}
                components={portableTextComponents}
              />
            </div>
          </div>
        )}
        {settings?.navSecondary && (
          <nav className='nav-secondary'>
            {/* <h2 className='text-md md:text-lg '>partenaires</h2> */}
            {/* <hr /> */}
            <ul>
              {settings?.navSecondary.map((item) => (
                <li key={item._key}>
                  {item._type === "linkIcon" && (
                    <a href={item.link}>
                      <Image
                        style={{
                          transform: `scale(${item.size || 1})`,
                        }}
                        src={urlFor(item.icon?.asset)}
                        alt={item.label || ""}
                        width={
                          item.icon?.asset?.metadata?.dimensions?.width || 24
                        }
                        height={
                          item.icon?.asset?.metadata?.dimensions?.height || 24
                        }
                      />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
        {/* <Mailchimp action='' optin /> */}
      </div>
    </footer>
  );
};

export default Footer;
