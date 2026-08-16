import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { TextSplitUI } from "@/app/sanity-api/types/sanity.types";
import { PortableText } from "next-sanity";
import React from "react";
import Figure from "../Figure";

type Props = {
  input: TextSplitUI;
};

const ModuleTextSplit = ({ input }: Props) => {
  const { title, texts, image, footerText } = input;

  return (
    <section className='module module--text-split-ui'>
      <div className='header '>
        {title && <h2 className='title text-lg'>{title}</h2>}
      </div>

      <div className='flex flex-col md:flex-row gap-md md:gap-lg'>
        {texts?.map((item, index) => (
          <div key={index} className='md:max-w-1/2'>
            {item?.text && (
              <div className='text'>
                <PortableText
                  value={item.text}
                  components={portableTextComponents}
                />
              </div>
            )}
          </div>
        ))}
        {/* <div className='sep-line'></div> */}
      </div>

      <div className='media w-4/12'>
        {image && <Figure asset={image.asset} />}
      </div>
      {footerText && <div className='footer'>{footerText}</div>}
    </section>
  );
};

export default ModuleTextSplit;
