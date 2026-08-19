import React from "react";
import CardText from "../CardText";
import { GridCardTextUI } from "@/app/sanity-api/types/sanity.types";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";

type Props = {
  input: GridCardTextUI;
};

const ModuleGridCardTextUI = ({ input }: Props) => {
  const { title, subtitle, text, items } = input;

  return (
    <section className='module module--grid-card-text-ui'>
      {title ||
        subtitle ||
        (text && (
          <div className='header mb-lg'>
            {title && <h2 className='title text-lg'>{title}</h2>}

            {subtitle && <p className='subtitle'>{subtitle}</p>}
            {text && (
              <div className='text'>
                <div className='module__text text'>
                  <PortableText
                    value={text}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-md'>
        {items?.map((item, i) => (
          <CardText key={i} input={item} />
        ))}
      </div>
    </section>
  );
};

export default ModuleGridCardTextUI;
