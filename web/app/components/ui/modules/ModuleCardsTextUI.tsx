import clsx from "clsx";
import React from "react";
import CardText from "../CardText";

type Props = {
  direction?: "ltr" | "rtl";
};

const ModuleCardsTextUI = ({ direction = "ltr" }: Props) => {
  const items = [
    {
      text: "Margot Lecarpentier Fondatrice du bar Combat (Paris-Belleville), experte en boissons alcoolisées et non alcoolisées [+]",
      color: "blue-50",
    },
    {
      text: "Virginie Godard Fondatrice du Food Market, premier marché de street food de Paris, devenu en onze ans un événement populaire [+]",
      color: "orange-50",
    },
    {
      text: "Alexandra Couturier Consultante spécialisée dans la protection des actifs et des marques, elle accompagne des acteurs majeurs [+] ",
      color: "lime-100",
    },
  ];
  return (
    <section className='module module--cards-text-ui'>
      <div
        className={clsx(
          "flex flex-col md:flex-row gap-md",
          direction === "rtl" && "md:flex-row-reverse",
        )}>
        <div className='col-text w-full md:w-1/2'>
          <div className='grid grid-cols-1  gap-md'>
            {items.map((item, i) => (
              <CardText key={i} {...item} />
            ))}
          </div>
        </div>
        <div className='col-media w-full md:w-1/2'>
          <figure className='rounded'>
            <img src='https://picsum.photos/600/600' alt='Concept' />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default ModuleCardsTextUI;
