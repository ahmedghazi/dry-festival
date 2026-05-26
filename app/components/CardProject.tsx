import React from "react";
import { Project } from "../types/schema";
import { _localizeField } from "../sanity-api/utils";

type Props = {
  input: Project;
};

const CardProject = ({ input }: Props) => {
  return (
    <article className='card card--project'>
      <h2>{_localizeField(input?.title)}</h2>
    </article>
  );
};

export default CardProject;
