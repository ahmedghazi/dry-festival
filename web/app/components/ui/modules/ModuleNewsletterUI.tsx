import clsx from "clsx";
import React from "react";
import Mailchimp from "../Mailchimp";
import { NewsletterUI } from "@/app/sanity-api/types/sanity.types";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";

type Props = {
  input: NewsletterUI;
};

const ModuleNewsletterUI = ({ input }: Props) => {
  const { title, text } = input;
  return (
    <section className='module module--newsletter-ui'>
      <div className='inner'>
        {title && <h2 className='title text-lg'>{title}</h2>}

        {text && (
          <div className='text'>
            <div className='module__text text'>
              <PortableText value={text} components={portableTextComponents} />
            </div>
          </div>
        )}

        <Mailchimp action='' optin />
      </div>
    </section>
  );
};

export default ModuleNewsletterUI;
