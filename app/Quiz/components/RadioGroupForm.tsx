// RadioGroup.js
import React, { useRef } from "react";
import { RadioGroupFormType } from "../types/quiz.type";
import { cn } from "~/utils";
import { Input } from "~/components/input";
import Button from "~/components/button";

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
      <fieldset className="flex flex-col space-y-20">
        <legend id={`${name}-"label"`} className="w-full">
          <h3 className="text-3xl font-bold tracking-tight text-center mt-4 mx-auto">
            {label}
          </h3>
        </legend>

        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label
              key={option}
              className={cn(
                "flex items-center gap-4 p-4 border rounded-md bg-indigo-400 text-white",
                "w-full text-xl text-pretty font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              )}
            >
              <Input
                className="h-4 w-4 rounded-none"
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

      <div className="flex p-8 md:px-0">
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

export default RadioGroupForm;
