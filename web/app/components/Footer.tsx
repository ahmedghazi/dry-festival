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
            <ul>
              {settings?.navSecondary.map((item) => (
                <li key={item._key}>
                  {item._type === "linkIcon" && (
                    <a href={item.link}>
                      <Image
                        src={urlFor(item.icon?.asset)}
                        alt={item.label || ""}
                        width={
                          item.icon?.asset?.metadata?.dimensions?.width || 24
                        }
                        height={
                          item.icon?.asset?.metadata?.dimensions?.height || 24
                        }
                        style={
                          {
                            "--s": item.size || 1,
                          } as React.CSSProperties
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
        <div className='credits'>
          <p>© {new Date().getFullYear()} Dry Festival. All rights reserved.</p>
          <p>
            Design{" "}
            <a
              href='https://fakepaper.fr/'
              target='_blank'
              rel='noopener noreferrer'>
              Fake Paper
            </a>
            {", "}
            Code{" "}
            <a
              href='https://www.ahmedghazi.com'
              target='_blank'
              rel='noopener noreferrer'>
              Ahmed Ghazi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
