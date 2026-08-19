import clsx from "clsx";
import React from "react";
import Mailchimp from "../Mailchimp";
import Form from "../Form";
import { FormUI } from "@/app/sanity-api/types/sanity.types";
import Figure from "../Figure";

type Props = {
  input: FormUI;
};

const ModuleFormUI = ({ input }: Props) => {
  const { image } = input;
  return (
    <section className='module module--form-ui'>
      <div className='inner'>
        <div className='grid md:grid-cols-2 gap-md'>
          <div className='col-media'>
            {image && <Figure className='card-img' asset={image.asset} />}
          </div>
          <div className='col-text'>
            <Form
              action='/api/contact'
              fields={[
                {
                  name: "NAME",
                  placeholder: "nom",
                  type: "text",
                  required: true,
                },
                {
                  name: "EMAIL",
                  placeholder: "email",
                  type: "email",
                  required: true,
                },
                {
                  name: "MESSAGE",
                  placeholder: "message",
                  type: "textarea",
                  required: true,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleFormUI;
