import React from "react";
import ModuleImageTextUI from "./ModuleImageTextUI";
import ModuleTextUI from "./ModuleTextUI";
import ModuleDryWater from "./ModuleDryWater";
import ModuleNewsletterUI from "./ModuleNewsletterUI";
import ModuleGridCardTextUI from "./ModuleGridCardTextUI";
import ModuleTextSplit from "./ModuleTextSplit";
import ModuleFormUI from "./ModuleFormUI";
import ModuleListCardsImageUI from "./ModuleListCardsImageUI";
import { ModulesList } from "@/app/sanity-api/types/extra-types";
import { getSettings } from "@/app/sanity-api/sanity-queries";
import "./index.scss";

type Props = {
  modules: ModulesList;
};

const Modules = async ({ modules }: Props) => {
  const settings = await getSettings();
  const randomizeDryWaterColors = settings?.randomizeDryWaterColors ?? true;

  const _renderModules = () => {
    return modules?.map((module) => {
      switch (module._type) {
        case "dryWaterUI":
          return (
            <ModuleDryWater
              key={module._key}
              input={module}
              randomizeColors={randomizeDryWaterColors}
            />
          );
        case "textUI":
          return <ModuleTextUI key={module._key} input={module} />;
        case "formUI":
          return <ModuleFormUI key={module._key} input={module} />;
        case "gridCardTextUI":
          return <ModuleGridCardTextUI key={module._key} input={module} />;
        case "listCardsImageUI":
          return <ModuleListCardsImageUI key={module._key} input={module} />;
        case "textSplitUI":
          return <ModuleTextSplit key={module._key} input={module} />;
        case "imageTextUI":
          return <ModuleImageTextUI key={module._key} input={module} />;
        case "imageTextUI":
          return <ModuleImageTextUI key={module._key} input={module} />;
        case "newsletterUI":
          return <ModuleNewsletterUI key={module._key} input={module} />;
        default:
          return null;
      }
    });
  };
  return <div className='modules'>{_renderModules()}</div>;
};

export default Modules;
