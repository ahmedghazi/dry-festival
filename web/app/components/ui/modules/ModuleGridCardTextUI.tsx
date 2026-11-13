import React, { Fragment } from "react";
import CardText from "../CardText";
import { GridCardTextUI } from "@/app/sanity-api/types/sanity.types";
import { PortableText, stegaClean } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import CardTextDropDownComponent from "../CardTextDropDown";
import CardTextDropDownAgendaComponent from "../CardTextDropDownAgenda";

type Props = {
  input: GridCardTextUI;
};

const ModuleGridCardTextUI = ({ input }: Props) => {
  const { title, subtitle, text, items } = input;
  const hasHeading = title || subtitle || text;
  return (
    <section className='module module--grid-card-text-ui'>
      <div className='inner'>
        {hasHeading && (
          <div className='header '>
            {title && (
              <h2 className='title text-md md:text-lg'>{stegaClean(title)}</h2>
            )}

            {subtitle && <p className='subtitle'>{stegaClean(subtitle)}</p>}
            {text && (
              <div className='text'>
                <div className='module__text text'>
                  <PortableText
                    value={stegaClean(text)}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-sm md:gap-md'>
          {items?.map((item, i) => (
            <Fragment key={i}>
              {item._type === "cardText" && <CardText key={i} input={item} />}
              {item._type === "cardTextDropDownAgenda" && (
                <CardTextDropDownAgendaComponent key={i} input={item} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModuleGridCardTextUI;
