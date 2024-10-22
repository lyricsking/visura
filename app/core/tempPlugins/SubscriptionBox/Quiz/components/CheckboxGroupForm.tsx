import React, { useRef } from "react";
import { CheckboxGroupFormType } from "../types/quiz.type";
import { cn } from "~/core/utils/util";
import { Input } from "~/components/input";
import Button from "~/components/button";

const CheckboxGroupForm = ({
  disabled,
  id,
  label,
  name,
  onsubmit,
  options,
  submitLabel,
  selections,
}: CheckboxGroupFormType) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = document.getElementById(id) as HTMLFormElement;
    const formData = new FormData(form);
    const selectedCheckboxes = formData.getAll(name) as string[];

    if (selectedCheckboxes.length === 0) {
      alert("Please select at least one answer.");
      return;
    }
    onsubmit(selectedCheckboxes);
  };

  return (
    <form id={id} onSubmit={handleSubmit} aria-labelledby={`${name}-"label"`}>
      <fieldset className="flex flex-col space-y-16">
        <legend id={`${name}-"label"`}>
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
                type="checkbox"
                id={option}
                name={name}
                value={option}
                defaultChecked={
                  selections ? selections.includes(option) : false
                }
                aria-labelledby={`${option}-"label"`}
              />
              <span id={`${option}-label`}>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex py-8 md:px-0">
        <Button
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

export default CheckboxGroupForm;
