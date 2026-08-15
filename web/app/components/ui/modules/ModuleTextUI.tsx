import React from "react";

type Props = {};

const ModuleTextUI = (props: Props) => {
  return (
    <section className='module module--text-ui'>
      <div className='inner'>
        <div className='header'>
          <h2 className='title text-lg'>concept</h2>
        </div>{" "}
        <div className='text'>
          <p>
            Premier salon dédié au sans alcool en France, dry festival est un
            événement d’un genre nouveau. Nous réunissons de jeunes marques
            audacieuses, acteurs établis qui se réinventent, bartenders créatifs
            et un public curieux et exigeant. Un lieu pour goûter, mais aussi
            pour apprendre à choisir autrement ce que l’on boit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ModuleTextUI;
