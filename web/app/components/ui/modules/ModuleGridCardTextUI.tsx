import React from "react";
import CardText from "../CardText";

type Props = {
  title?: string;
  subtitle?: string;
};

const ModuleGridCardTextUI = (props: Props) => {
  const items = [
    {
      colSize: 6,
      title: "les expériences",
      text: "Bar à cocktails par Combat Belleville.  L’équipe de Combat sous la direction de Margot Lecarpentier  prend les commandes du bar avec une carte entièrement san",
      color: "purple-100",
      footerText:
        "Restez informé.e pour découvrir les intervenants et les temps forts",
    },
    {
      colSize: 6,
      title: "masterclasses & conférences",
      text: "Des sessions ouvertes aux amateurs comme aux professionnels: création produit, nouveaux usages, construction d’une  carte sans alcool cohérente, intégration dans une offre existante.  Un format pensé pour donner des clés concrètes.",
      color: "yellow-100",
    },
    {
      colSize: 3,
      title: "Peronni",
      color: "blue-200",
    },
    {
      colSize: 3,
      title: "Finote",
      color: "pink-50",
    },
    {
      colSize: 3,
      title: "dégustations",
      text: "Rencontrer les marques, goûter leurs produits, comprendre leur approche. Un temps de découverte, mais  aussi d’apprentissage du goût et des alternatives possibles.",
      color: "green-100",
    },
  ];
  return (
    <section className='module module--grid-card-text-ui'>
      <div className='header mb-lg'>
        <h2 className='title text-lg'>{props.title || "concept"}</h2>
        {props.subtitle && <p className='subtitle'>{props.subtitle}</p>}
        <div className='text '>
          <p>
            Premier salon dédié au sans alcool en France, dry festival est un
            événement d’un genre nouveau. Nous réunissons de jeunes marques
            audacieuses, acteurs établis qui se réinventent, bartenders créatifs
            et un public curieux et exigeant. Un lieu pour goûter, mais aussi
            pour apprendre à choisir autrement ce que l’on boit.
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-md'>
        {items.map((item, i) => (
          <CardText key={i} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ModuleGridCardTextUI;
