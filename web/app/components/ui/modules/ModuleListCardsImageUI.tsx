import clsx from "clsx";
import React from "react";
import CardText from "../CardText";
import { ListCardsImageUI } from "@/app/sanity-api/types/sanity.types";
import Figure from "../Figure";

type Props = {
  input: ListCardsImageUI;
};

const ModuleListCardsImageUI = ({ input }: Props) => {
  const { title, items, image } = input;
  return (
    <section className='module module--list-cards-image-ui'>
      <div className='header'>
        {title && <h2 className='title text-lg'>{title}</h2>}
      </div>
      <div
        className={clsx(
          "gap-md grid md:grid-cols-2",
          // direction === "rtl" && "md:flex-row-reverse",
        )}>
        <div className='col-text w-full order-2 md:order-1'>
          <div className='grid grid-cols-1 gap-md'>
            {items?.map((item, i) => (
              <CardText key={i} input={item} />
            ))}
          </div>
        </div>
        <div className='col-media w-full order-1 md:order-2'>
          {image && (
            <Figure className='card-img-' asset={image.asset} rounded={false} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ModuleListCardsImageUI;
