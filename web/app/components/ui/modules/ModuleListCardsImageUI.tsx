import clsx from "clsx";
import React, { Fragment } from "react";
import CardText from "../CardText";
import { ListCardsImageUI } from "@/app/sanity-api/types/sanity.types";
import Figure from "../Figure";
import { stegaClean } from "next-sanity";
import CardTextDropDownComponent from "../CardTextDropDown";

type Props = {
  input: ListCardsImageUI;
};

const ModuleListCardsImageUI = ({ input }: Props) => {
  const { title, items, image } = input;
  return (
    <section className='module module--list-cards-image-ui'>
      <div className='inner'>
        <div className='header'>
          {title && (
            <h2 className='title text-md md:text-lg'>{stegaClean(title)}</h2>
          )}
        </div>
        <div
          className={clsx(
            "gap-sm md:gap-md grid md:grid-cols-2",
            // direction === "rtl" && "md:flex-row-reverse",
          )}>
          <div className='col-text w-full order-2 md:order-1'>
            <div className='grid grid-cols-1 gap-sm md:gap-md'>
              {items?.map((item, i) => (
                // <CardText key={i} input={item} withDropDownText={true} />
                <Fragment key={i}>
                  {item._type === "cardTextDropDown" && (
                    <CardTextDropDownComponent key={i} input={item} />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div className='col-media w-full order-1 md:order-2'>
            {image && (
              <Figure
                className='card-img-'
                asset={image.asset}
                rounded={false}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleListCardsImageUI;
