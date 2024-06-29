import React, { useRef } from 'react';
import { CheckboxGroupFormType } from '../quiz.type';

const CheckboxGroupForm = ({label, name, onsubmit, options,submitLabel}: CheckboxGroupFormType) => {
  const formRef = useRef(null);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!) ;
    const selectedCheckboxes = formData.getAll(name) as string[];
    console.log('Selected checkboxes:', selectedCheckboxes);
    
    onsubmit(selectedCheckboxes)
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} aria-labelledby={`${name}-"label"`}>
      <fieldset>
        <legend id={`${name}-"label"`}>{label}</legend>
        {options.map((option)=>
        <label htmlFor={option}>
          <input type="checkbox" id={option} name={name} value={option} />{option}
        </label>
        )}
      </fieldset>
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default CheckboxGroupForm;
