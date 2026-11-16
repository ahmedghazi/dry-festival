import { ImageTextUI } from "@/app/sanity-api/types/sanity.types";
import clsx from "clsx";
import React from "react";
import Figure from "../Figure";
import { PortableText, stegaClean } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { SanityImageAssetExpanded } from "@/app/sanity-api/types/extra-types";

type Props = {
  input: ImageTextUI;
};

const ModuleImageTextUI = ({ input }: Props) => {
  const { title, subtitle, text, image, direction } = input;
  // asset is dereferenced in the query (fragments.ts > image)
  const asset = image?.asset as unknown as SanityImageAssetExpanded | undefined;

  return (
    <section className='module module--image-text-ui'>
      <div
        className={clsx(
          "flex flex-col md:flex-row items-center gap-md",
          direction === "ltr" && "md:flex-row-reverse",
        )}>
        {image && (
          <div className='col-media w-full md:w-1/2'>
            <Figure
              className='card-img'
              asset={asset}
              copyright={asset?.creditLine || ""}
            />
          </div>
        )}
        <div className='col-text w-full md:w-1/2'>
          {/* {direction} */}
          {title && (
            <h2 className='title text-md md:text-lg '>{stegaClean(title)}</h2>
          )}
          {subtitle && <p className='subtitle'>{stegaClean(subtitle)}</p>}
          {text && (
            <div className='text'>
              <PortableText
                value={stegaClean(text)}
                components={portableTextComponents}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModuleImageTextUI;
