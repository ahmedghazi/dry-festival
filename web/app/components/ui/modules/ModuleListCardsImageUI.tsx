import clsx from "clsx";
import React from "react";
import CardText from "../CardText";
import { ListCardsImageUI } from "@/app/sanity-api/types/sanity.types";
import Figure from "../Figure";

type Props = {
  input: ListCardsImageUI;
};

const ModuleListCardsImageUI = ({ input }: Props) => {
  const { items, image } = input;
  return (
    <section className='module module--cards-text-ui'>
      <div
        className={clsx(
          "flex flex-col md:flex-row gap-md",
          // direction === "rtl" && "md:flex-row-reverse",
        )}>
        <div className='col-text w-full md:w-1/2'>
          <div className='grid grid-cols-1  gap-md'>
            {items?.map((item, i) => (
              <CardText key={i} {...item} />
            ))}
          </div>
        </div>
        <div className='col-media w-full md:w-1/2'>
          {image && <Figure asset={image.asset} />}
        </div>
      </div>
    </section>
  );
};

export default ModuleListCardsImageUI;
