import React from "react";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import Mailchimp from "./ui/Mailchimp";
import { SETTINGS_QUERY_RESULT } from "../sanity-api/types/sanity.types";

type Props = {
  settings: SETTINGS_QUERY_RESULT;
};

const Footer = ({ settings }: Props) => {
  // const { contact, contactText } = settings;
  return (
    <footer>
      <div className='inner'>
        <h2 className='md:text-lg'>contact</h2>
        {settings?.contactText && (
          <div className='text'>
            <div className='module__text text'>
              <PortableText
                value={settings?.contactText}
                components={portableTextComponents}
              />
            </div>
          </div>
        )}
        <Mailchimp action='' optin />
      </div>
    </footer>
  );
};

export default Footer;
