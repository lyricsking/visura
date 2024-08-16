// InputText.js
import React, { useRef } from "react";
import Button from "~/components/button";
import { Input } from "~/components/input";
import { TextInputFormType } from "../types/quiz.type";

const TextInputForm = ({
  disabled,
  id,
  label,
  name,
  onsubmit,
  submitLabel,
  value,
}: TextInputFormType) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = document.getElementById(id) as HTMLFormElement;
    const formData = new FormData(form);
    const textInput = formData.get(name) as string;

    if (!textInput) {
      alert("Please provide an answer.");
      return;
    }

    onsubmit(textInput);
  };

  return (
    <form id={id}  onSubmit={handleSubmit}>
      <div className="flex flex-col gap-20">
        <label htmlFor={name}>
          <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
            {label}
          </h3>
        </label>

        <Input
          className="h-20 text-2xl border-2"
          type="text"
          id={name}
          name={name}
          defaultValue={value || ""}
          placeholder={name}
        />
      </div>
      
      <div className="flex fixed z-20 bottom-0 right-0 left-0 p-4 bg-white">
        <Button
          variant={"fill"}
          radius={"md"}
          className="h-12 w-2/3  max-w-md mx-auto text-xl text-white text-center bg-indigo-400"
          type="submit"
          disabled={disabled}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default TextInputForm;
