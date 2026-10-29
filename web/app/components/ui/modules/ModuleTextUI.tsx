import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { TextUI } from "@/app/sanity-api/types/sanity.types";
import { PortableText, stegaClean } from "next-sanity";
import React from "react";

type Props = {
  input: TextUI;
};

const ModuleTextUI = ({ input }: Props) => {
  const { title, subtitle, text } = input;
  const hasHeading = title || subtitle;
  console.log(text);
  return (
    <section className='module module--text-ui'>
      <div className='inner'>
        {hasHeading && (
          <div className='header'>
            {title && (
              <h2 className='title text-md md:text-lg '>{stegaClean(title)}</h2>
            )}
            {subtitle && <p className='subtitle'>{stegaClean(subtitle)}</p>}
          </div>
        )}
        {text && (
          <div className='text'>
            <div className='module__text text'>
              {/* <pre className='text-xs'>{JSON.stringify(text, null, 2)}</pre> */}
              <PortableText
                value={stegaClean(text)}
                components={portableTextComponents}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModuleTextUI;
