import React from "react";
import ModuleImageTextUI from "./ModuleImageTextUI";
import ModuleTextUI from "./ModuleTextUI";
import ModuleDryWater from "./ModuleDryWater";
import ModuleNewsletterUI from "./ModuleNewsletterUI";
import ModuleGridCardTextUI from "./ModuleGridCardTextUI";
import "./index.scss";
import ModuleTextSplit from "./ModuleTextSplit";
import ModuleFormUI from "./ModuleFormUI";
import ModuleCardsTextUI from "./ModuleCardsTextUI";

type Props = {};

const Modules = (props: Props) => {
  return (
    <div className='modules'>
      <ModuleDryWater />
      <ModuleTextUI />
      <ModuleFormUI />
      <ModuleGridCardTextUI subtitle='Un lieu pour :' />
      <ModuleCardsTextUI />
      <ModuleTextSplit />
      <ModuleImageTextUI />
      <ModuleImageTextUI direction='rtl' />
      <ModuleNewsletterUI />
    </div>
  );
};

export default Modules;
