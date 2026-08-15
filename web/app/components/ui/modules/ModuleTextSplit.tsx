import React from "react";

type Props = {};

const ModuleTextSplit = (props: Props) => {
  return (
    <section className='module module--text-split-ui'>
      <div className='header'>
        <h2 className='title text-lg'>un format unique</h2>
      </div>
      <div className='flex flex-col md:flex-row gap-md md:gap-lg'>
        <div className='md:max-w-1/2'>
          <div className='text'>
            <p>
              <strong>Pour les professionnels :</strong>
              <br />
              <br />• Découvrir les marques et les innovations du secteur. •
              Comprendre comment intégrer le sans alcool dans leur offre
              mixologique. • Repenser leur carte et leurs usages. • Monter en
              compétence sur un sujet en pleine évolution.
            </p>
          </div>
        </div>
        <div className='sep-line'></div>
        <div className='md:max-w-1/2'>
          <div className='text'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ex
              suscipit facilis. Est nobis tempore maiores cumque obcaecati,
              officiis quo quidem debitis, optio temporibus et pariatur totam!
              Sunt, accusamus expedita!
            </p>
          </div>
        </div>
      </div>
      <div className='media'>
        <figure className='rounded'>
          <img src='https://picsum.photos/600/600' alt='Concept' />
        </figure>
      </div>
      <div className='footer'>
        Les visiteurs ne renoncent pas à quelque chose. Ils s’autorisent autre
        chose.
      </div>
    </section>
  );
};

export default ModuleTextSplit;
