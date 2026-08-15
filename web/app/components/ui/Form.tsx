"use client";
import React, { useState } from "react";
import clsx from "clsx";

type FieldProp = {
  name: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
};

type Props = {
  action: string;
  fields: FieldProp[];
};

const validateEmail = (value: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(value);
};

const Form = ({ action, fields }: Props) => {
  const messages = {
    sending: "envoi...",
    success: "Message envoyé. Merci !",
    error: "Erreur :(",
    empty: "Merci de compléter tous les champs.",
    button: "envoyer",
  };

  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.name, ""]))
  );
  const [status, setStatus] = useState<string>("");

  const getButtonMsg = () => {
    switch (status) {
      case "sending":
        return messages.sending;
      case "success":
        return messages.success;
      case "empty":
        return messages.empty;
      case "error":
        return messages.error;
      default:
        return messages.button;
    }
  };

  const isValid = () =>
    fields.every((field) => {
      const value = values[field.name];
      if (field.required && !value) return false;
      if (field.type === "email" && value) return validateEmail(value);
      return true;
    });

  const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValid()) {
      setStatus("empty");
      return;
    }

    sendData();
  };

  const sendData = () => {
    setStatus("sending");
    fetch(action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setStatus("success");
        setValues(Object.fromEntries(fields.map((field) => [field.name, ""])));
      })
      .catch(() => setStatus("error"));
  };

  return (
    <form onSubmit={handleSubmit} className={clsx("form")}>
      {fields.map((field) => (
        <div key={field.name} className={`form-row form-row__${field.name.toLowerCase()}`}>
          <div className='flex items-center gap-md'>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={values[field.name]}
                onChange={({ target }) =>
                  setValues((prev) => ({ ...prev, [field.name]: target.value }))
                }
                className='w-full'
              />
            ) : (
              <input
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                required={field.required}
                role='textbox'
                value={values[field.name]}
                onChange={({ target }) =>
                  setValues((prev) => ({ ...prev, [field.name]: target.value }))
                }
                className='w-full'
              />
            )}
          </div>
        </div>
      ))}
      <div className='form-row form-row__submit'>
        <button
          disabled={status === "sending" || status === "success"}
          type='submit'
          aria-label='submit'
          className={"italic serif"}>
          <span>{getButtonMsg()}</span>
        </button>
      </div>
    </form>
  );
};

export default Form;
