import clsx from "clsx";
import React from "react";

type Props = {
  title?: string;
  colSize?: number;
  color: string;
  text?: string;
  footerText?: string;
};

const CardText = ({ title, colSize = 1, color, text, footerText }: Props) => {
  return (
    <div className={clsx("card-outer", `md:col-span-${colSize}`)}>
      <div
        className={clsx("card card-text rounded")}
        style={{
          backgroundColor: `var(--color-${color})`,
        }}>
        {title && <h2 className='text-lg ellipsis-'>{title}</h2>}
        {text && (
          <div className='text text-sm'>
            <p>{text}</p>
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

export default CardText;
