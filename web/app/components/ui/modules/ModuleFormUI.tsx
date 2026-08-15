import clsx from "clsx";
import React from "react";
import Mailchimp from "../Mailchimp";
import Form from "../Form";

type Props = {};

const ModuleFormUI = () => {
  return (
    <section className='module module--form-ui'>
      <div className='inner'>
        <div className='grid md:grid-cols-2 gap-md'>
          <div className='col-media'>
            <figure className='rounded'>
              <img src='https://picsum.photos/600/600' alt='Concept' />
            </figure>
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
