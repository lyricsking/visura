// RadioGroup.js
import React, { useRef } from "react";
import { RadioGroupFormType } from "../quiz.type";
import { cn } from "~/shared/utils";
import { Input } from "~/shared/components/input";
import Button from "~/shared/components/button";

const RadioGroupForm = ({
  disabled,
  id,
  label,
  name,
  options,
  onsubmit,
  submitLabel,
  value,
}: RadioGroupFormType) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = document.getElementById(id) as HTMLFormElement;
    const formData = new FormData(form);
    const selectedOption = formData.get(name) as string;

    if (!selectedOption) {
      alert("Please select an answer.");
      return;
    }

    onsubmit(selectedOption);
  };

  return (
    <form id={id} onSubmit={handleSubmit} aria-labelledby={`${name}-"label"`}>
      <fieldset className="flex flex-col gap-20">
        <legend id={`${name}-"label"`}>
          <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
            {label}
          </h3>
        </legend>

        <div>
          {options.map((option) => (
            <label
              key={option}
              className={cn(
                "flex items-center gap-4 p-6 border rounded-md bg-indigo-400 text-white",
                "w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              )}
            >
              <Input
                className="h-5 w-5 rounded-none"
                type="radio"
                id={option}
                name={name}
                value={option}
                defaultChecked={value ? value === option : false}
                aria-labelledby={`${option}-"label"`}
              />
              <span id={`${option}-label`}>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex fixed z-20 bottom-8 right-0 left-0 bg-white">
        <Button
          variant={"fill"}
          radius={"md"}
          className="h-12 w-2/3 mx-auto text-xl text-white text-center bg-indigo-400"
          type="submit"
          disabled={disabled}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default RadioGroupForm;
