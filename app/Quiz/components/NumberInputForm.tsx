import React, { useRef } from "react";
import Button from "~/components/button";
import { NumberInputFormType } from "../types/quiz.type";
import { Input } from "~/components/input";

const NumberInputForm = ({
  disabled,
  id,
  label,
  name,
  onsubmit,
  submitLabel,
  value,
}: NumberInputFormType) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    //  Prevents default form handler
    event.preventDefault();
    //  Retrieve formdata instance from form element
    const form = document.getElementById(id) as HTMLFormElement;
    const formData = new FormData(form);
    //  Get value from data by name
    const numberInput = formData.get(name) as string;

    if (!numberInput) {
      alert("Please provide an appropriate answer.");
      return;
    }

    onsubmit(numberInput);
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-20">
        <label htmlFor={name}>
          <h3 className="text-3xl font-bold tracking-tight text-center mt-4 mx-auto">
            {label}
          </h3>
        </label>

        <Input
          className="h-14 text-xl border-2"
          type="number"
          id={name}
          name={name}
          defaultValue={value || ""}
          placeholder={name}
        />
      </div>

      <div className="flex py-8 md:px-0">
        <Button
          variant={"fill"}
          radius={"md"}
          className="h-12 w-full md:max-w-md mx-auto text-xl text-white text-center bg-indigo-400"
          type="submit"
          disabled={disabled}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default NumberInputForm;
