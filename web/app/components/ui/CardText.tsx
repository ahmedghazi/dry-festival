import clsx from "clsx";
import React from "react";
import { PortableText } from "next-sanity";
import { CardTextItem } from "@/app/sanity-api/types/extra-types";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { CardText } from "@/app/sanity-api/types/sanity.types";
import PortableExcerptToText from "./PortableExcerptToText";

type Props = {
  input: CardText;
  withDropDownText?: boolean;
};

const CardTextComponent = ({ input, withDropDownText = false }: Props) => {
  return (
    <div
      className={clsx(
        "card-outer",
        `md:col-span-${input?.colSize}`,
        // `md:w-${input?.colSize}/12`,
      )}>
      <div
        className={clsx("card card-text rounded")}
        style={
          input?.color
            ? { backgroundColor: `var(--color-${input.color})` }
            : undefined
        }>
        {input?.title && <h2 className='text-lg ellipsis-'>{input.title}</h2>}
        {input?.subtitle && <p className='subtitle'>{input.subtitle}</p>}
        {input?.text && (
          <div className='text text-sm'>
            {withDropDownText ? (
              <PortableExcerptToText value={input.text} />
            ) : (
              <PortableText
                value={input.text}
                components={portableTextComponents}
              />
            )}
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
