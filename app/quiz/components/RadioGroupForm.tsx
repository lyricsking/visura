// RadioGroup.js
import React, { useRef } from 'react';
import { RadioGroupFormType } from '../quiz.type';

const RadioGroupForm = ({label, name, options, onsubmit, submitLabel, value}: RadioGroupFormType) => {
  const formRef = useRef(null);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const selectedOption = formData.get(name)as string;
    console.log('Selected radio:', selectedOption);
    
    onsubmit(selectedOption)
  };

  
  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      aria-labelledby={`${name}-"label"`}
    >
      <fieldset className="flex flex-col gap-10">
        <legend id={`${name}-"label"`}>
          <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
            {label}
          </h3>
        </legend>
        
        {options.map((option)=>
        <label 
          className={cn("items-center gap-4 p-6 border rounded-md bg-indigo-400 text-white",
            "w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            type === "flex" && "flex",
            type === "flow" && "inline-flex"
          )}
        >
          <Input
            className="h-5 w-5 rounded-none"
            type="radio" 
            id={option} 
            name={name} 
            value={option}
            aria-labelledby={`${option}-"label"`}
          /> 
          <span id={`${option}-label`}>
            {option}
          </span>
        </label>
        )}
      </fieldset>
      
      <div className="flex fixed z-20 bottom-8 right-0 left-0 bg-white"
      >
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

export default RadioGroupForm;
