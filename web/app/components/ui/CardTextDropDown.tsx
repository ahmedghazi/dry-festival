"use client";

import clsx from "clsx";
import React from "react";
import { PortableText, stegaClean } from "next-sanity";
import { CardTextItem } from "@/app/sanity-api/types/extra-types";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { CardTextDropDown } from "@/app/sanity-api/types/sanity.types";
import PortableExcerptToText from "./PortableExcerptToText";

type Props = {
  input: CardTextDropDown;
};

const CardTextDropDownComponent = ({ input }: Props) => {
  return (
    <div className={clsx("card-outer")}>
      <div
        className={clsx("card card-text-dropdown rounded")}
        style={
          input?.color
            ? { backgroundColor: `var(--color-${input.color})` }
            : undefined
        }>
        {input?.title && (
          <h3 className='text-md strong ellipsis-'>
            {stegaClean(input.title)}
          </h3>
        )}

        {input?.text && (
          <div className='text text-sm'>
            <PortableExcerptToText
              value={stegaClean(input.text)}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTextDropDownComponent;
