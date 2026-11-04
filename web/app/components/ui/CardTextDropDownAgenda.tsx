"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { PortableText, stegaClean } from "next-sanity";
import { CardTextItem } from "@/app/sanity-api/types/extra-types";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import {
  CardTextDropDown,
  CardTextDropDownAgenda,
} from "@/app/sanity-api/types/sanity.types";
import PortableExcerptToText from "./PortableExcerptToText";

type Props = {
  input: CardTextDropDownAgenda;
};

const CardTextDropDownAgendaComponent = ({ input }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const _onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Let links and the excerpt's own toggles handle their clicks.
    const target = e.target as HTMLElement;
    if (target.closest("a, button, [role='button']")) return;
    // Don't toggle when the user is selecting text.
    if (window.getSelection()?.toString()) return;
    setIsOpen((open) => !open);
  };

  return (
    <div
      className={clsx("card-outer", `md:col-span-${input?.colSize}`)}
      onClick={_onClick}>
      <div
        className={clsx("card card-text-dropdown rounded")}
        style={
          input?.color
            ? { backgroundColor: `var(--color-${input.color})` }
            : undefined
        }>
        {/* {input?.title && <h3 className='text-md strong'>{input.title}</h3>} */}
        {input?.title && <h2 className='text-md md:text-lg'>{input.title}</h2>}
        {input?.subtitle && (
          <p className='subtitle'>{stegaClean(input.subtitle)}</p>
        )}
        {isOpen && (
          <button className='card-toggle' onClick={(e) => setIsOpen(false)}>
            [—]
          </button>
        )}
        {input?.text && (
          <div className='text text-sm'>
            <PortableExcerptToText
              value={stegaClean(input.text)}
              components={portableTextComponents}
              hideExcerpt={true}
              className='no-excerpt with-scrollbar'
              isOpen={isOpen}
              onOpenChange={setIsOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTextDropDownAgendaComponent;
