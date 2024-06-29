import React, { useRef } from 'react';
import Button from '~/shared/components/button';
import { NumberInputFormType } from '../quiz.type';

const NumberInputForm = ({disabled, label, name, onsubmit, submitLabel, value}:NumberInputFormType) => {
  const formRef = useRef(null);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    //  Prevents default form handler
    event.preventDefault();
    //  Retrieve formdata instance from form element
    const formData = new FormData(formRef.current!);
    //  Get value from data by name
    const numberInput = formData.get(name) as string;
    console.log('Number input:', numberInput);
    onsubmit(numberInput)
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor={ name}>
        <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
          {name}
        </h3>
        {label}
      </label>
      
      <input type="number" id={name} name={name} defaultValue={value} />
      <div className="flex fixed z-20 bottom-8 right-0 left-0 bg-white">
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

export default NumberInputForm;
