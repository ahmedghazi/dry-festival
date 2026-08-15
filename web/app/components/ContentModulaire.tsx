import React from "react";
import Modules from "./ui/modules";

type Props = {};

const ContentModulaire = (props: Props) => {
  return (
    <div className='content--modulaire'>
      <div className='container-fluid'>
        <Modules />
      </div>
    </div>
  );
};

export default ContentModulaire;
