import React from "react";
import { SETTINGS_QUERY_RESULT } from "../sanity-api/types/sanity.types";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import Mailchimp from "./ui/Mailchimp";

type Props = {
  settings: SETTINGS_QUERY_RESULT;
};

const Footer = ({ settings }: Props) => {
  const { contact, contactText } = settings;
  return (
    <footer>
      <div className='inner'>
        <h2 className='md:text-lg'>contact</h2>
        <div className='text'>
          <div className='module__text text'>
            <PortableText
              value={contactText}
              components={portableTextComponents}
            />
          </div>
        </div>
        <Mailchimp action='' optin />
      </div>
    </footer>
  );
};

export default Footer;
