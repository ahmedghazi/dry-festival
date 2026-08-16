import clsx from "clsx";
import React from "react";
import { PortableText } from "next-sanity";
import { CardTextItem } from "@/app/sanity-api/types/extra-types";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { CardText } from "@/app/sanity-api/types/sanity.types";

type Props = {
  input: CardText;
};

const CardTextComponent = ({ input }: Props) => {
  // const { title, text, footerText, colSize, color } = input;
  return (
    <div className={clsx("card-outer", `md:col-span-${input?.colSize}`)}>
      <div
        className={clsx("card card-text rounded")}
        style={
          input?.color
            ? { backgroundColor: `var(--color-${input.color})` }
            : undefined
        }>
        {input?.title && <h2 className='text-lg ellipsis-'>{input.title}</h2>}
        {input?.text && (
          <div className='text text-sm'>
            <PortableText
              value={input.text}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
      {input?.footerText && (
        <div className='footer text text-xs md:text-sm '>
          <p>{input.footerText}</p>
        </div>
      )}
    </div>
  );
};

export default CardTextComponent;
