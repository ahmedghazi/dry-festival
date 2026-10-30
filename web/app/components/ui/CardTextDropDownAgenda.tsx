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

const CardTextDropDownAgendaComponent = ({ input }: Props) => {
  return (
    <div className={clsx("card-outer", `md:col-span-${input?.colSize}`)}>
      <div
        className={clsx("card card-text-dropdown rounded")}
        style={
          input?.color
            ? { backgroundColor: `var(--color-${input.color})` }
            : undefined
        }>
        {/* {input?.title && <h3 className='text-md strong'>{input.title}</h3>} */}
        {input?.title && <h2 className='text-md md:text-lg'>{input.title}</h2>}

        {input?.text && (
          <div className='text text-sm'>
            <PortableExcerptToText
              value={stegaClean(input.text)}
              components={portableTextComponents}
              hideExcerpt={true}
              className='no-excerpt'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTextDropDownAgendaComponent;
