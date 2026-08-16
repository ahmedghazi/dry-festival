import { ImageTextUI } from "@/app/sanity-api/types/sanity.types";
import clsx from "clsx";
import React from "react";
import Figure from "../Figure";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";

type Props = {
  input: ImageTextUI;
};

const ModuleImageTextUI = ({ input }: Props) => {
  const { title, subtitle, text, image, direction } = input;

  return (
    <section className='module module--image-text-ui'>
      <div
        className={clsx(
          "flex flex-col md:flex-row items-center gap-md",
          direction === "ltr" && "md:flex-row-reverse",
        )}>
        {image && (
          <div className='col-media w-full md:w-1/2'>
            <Figure asset={image.asset} />
          </div>
        )}
        <div className='col-text w-full md:w-1/2'>
          {title && <h2 className='title text-lg'>{title}</h2>}
          {subtitle && <p className='subtitle'>{subtitle}</p>}
          {text && (
            <div className='text'>
              <PortableText value={text} components={portableTextComponents} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModuleImageTextUI;
