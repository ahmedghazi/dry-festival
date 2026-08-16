import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { TextSplitUI } from "@/app/sanity-api/types/sanity.types";
import { PortableText } from "next-sanity";
import React from "react";
import Figure from "../Figure";

type Props = {
  input: TextSplitUI;
};

const ModuleTextSplit = ({ input }: Props) => {
  const { texts, image, footerText } = input;

  return (
    <section className='module module--text-split-ui'>
      <div className='flex flex-col md:flex-row gap-md md:gap-lg'>
        {texts?.map((text, index) => (
          <div key={index} className='md:max-w-1/2'>
            {text && (
              <div className='text'>
                <PortableText
                  value={text}
                  components={portableTextComponents}
                />
              </div>
            )}
          </div>
        ))}
        {/* <div className='sep-line'></div> */}
      </div>

      <div className='media'>{image && <Figure asset={image.asset} />}</div>
      {footerText && <div className='footer'>{footerText}</div>}
    </section>
  );
};

export default ModuleTextSplit;
