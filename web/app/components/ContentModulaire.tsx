import React from "react";
import Modules from "./ui/modules";
import { ModulesList } from "../sanity-api/types/extra-types";

type Props = {
  input: ModulesList;
};

const ContentModulaire = ({ input }: Props) => {
  return (
    <div className='content--modulaire'>
      <div className='container-fluid'>
        {input && <Modules modules={input} />}
      </div>
    </div>
  );
};

export default ContentModulaire;
