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
  const { title, text, footerText, colSize, color } = input;
  return (
    <div className={clsx("card-outer", `md:col-span-${colSize}`)}>
      <div
        className={clsx("card card-text rounded")}
        style={
          color ? { backgroundColor: `var(--color-${color})` } : undefined
        }>
        {title && <h2 className='text-lg ellipsis-'>{title}</h2>}
        {text && (
          <div className='text text-sm'>
            <PortableText value={text} components={portableTextComponents} />
          </div>
        )}
      </div>
      {footerText && (
        <div className='footer text text-xs md:text-sm '>
          <p>{footerText}</p>
        </div>
      )}
    </div>
  );
};

export default CardTextComponent;
