import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { TextUI } from "@/app/sanity-api/types/sanity.types";
import { PortableText } from "next-sanity";
import React from "react";

type Props = {
  input: TextUI;
};

const ModuleTextUI = ({ input }: Props) => {
  const { title, subtitle, text } = input;
  return (
    <section className='module module--text-ui'>
      <div className='inner'>
        <div className='header'>
          {title && <h2 className='title text-lg'>{title}</h2>}
          {subtitle && <p className='subtitle'>{subtitle}</p>}
        </div>
        <div className='text'>
          <div className='module__text text'>
            <PortableText value={text} components={portableTextComponents} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleTextUI;
