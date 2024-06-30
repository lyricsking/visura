import React, { useRef } from 'react';
import { CheckboxGroupFormType } from '../quiz.type';
import { cn } from '~/shared/utils';
import { Input } from '~/shared/components/input';
import Button from '~/shared/components/button';

const CheckboxGroupForm = ({
  disabled,
  id,
  label,
  name,
  onsubmit,
  options,
  submitLabel,
  selections
}: CheckboxGroupFormType) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = document.getElementById(id) as HTMLFormElement;
    const formData = new FormData(form);
    const selectedCheckboxes = formData.getAll(name) as string[];

    onsubmit(selectedCheckboxes);
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
              className={cn(
                "flex items-center gap-4 p-6 border rounded-md bg-indigo-400 text-white",
                "w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              )}
            >
              <Input
                className="h-5 w-5 rounded-none"
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

      <div className="flex fixed z-20 bottom-0 right-0 left-0 p-4 bg-white">
        <Button
          variant={"fill"}
          radius={"full"}
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

export default CheckboxGroupForm;
