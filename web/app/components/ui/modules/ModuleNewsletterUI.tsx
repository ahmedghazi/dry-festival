import clsx from "clsx";
import React from "react";
import Mailchimp from "../Mailchimp";

type Props = {};

const ModuleNewsletterUI = () => {
  return (
    <section className='module module--newsletter-ui'>
      <div className='inner'>
        <h2 className='subtitle text-lg'>some title</h2>
        <div className='text'>
          <p>
            Premier salon dédié au sans alcool en France, dry festival est un
            événement d’un genre nouveau. Nous réunissons de jeunes marques
            audacieuses, acteurs établis qui se réinventent, bartenders créatifs
            et un public curieux et exigeant. Un lieu pour goûter, mais aussi
            pour apprendre à choisir autrement ce que l’on boit.
          </p>
        </div>

        <Mailchimp action='' optin />
      </div>
    </section>
  );
};

export default ModuleNewsletterUI;
