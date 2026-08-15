import clsx from "clsx";
import React from "react";

type Props = {
  direction?: "ltr" | "rtl";
};

const ModuleImageTextUI = ({ direction = "ltr" }: Props) => {
  return (
    <section className='module module--image-text-ui'>
      <div
        className={clsx(
          "flex flex-col md:flex-row items-center gap-md",
          direction === "rtl" && "md:flex-row-reverse",
        )}>
        <div className='col-media w-full md:w-1/2'>
          <figure className='rounded'>
            <img src='https://picsum.photos/600/600' alt='Concept' />
          </figure>
        </div>
        <div className='col-text w-full md:w-1/2'>
          <h2 className='text-lg'>some title</h2>
          <div className='text'>
            <p>
              <strong>strong text</strong>
            </p>
            <p>
              Premier salon dédié au sans alcool en France, dry festival est un
              événement d’un genre nouveau. Nous réunissons de jeunes marques
              audacieuses, acteurs établis qui se réinventent, bartenders
              créatifs et un public curieux et exigeant. Un lieu pour goûter,
              mais aussi pour apprendre à choisir autrement ce que l’on boit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleImageTextUI;
