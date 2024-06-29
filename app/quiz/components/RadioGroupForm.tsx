// RadioGroup.js
import React, { useRef } from 'react';

const RadioGroupForm = ({label, name, options, onsubmit, submitLabel, value}: RadioGroupFormType) => {
  const formRef = useRef(null);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const selectedOption = formData.get(name);
    console.log('Selected radio:', selectedOption);
    
    onsubmit(selectedOption)
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} aria-labelledby={`${name}-label`}>
      <fieldset>
        <legend id="radio-group-label">{label}</legend>
        {options.map((option)=> 
          <label>
            <input type="radio" name={name} value={option} defaultChecked={option===value} aria-labelledby={`${option}-label`} />
            <span id={`${option}-label`}>{option}</span>
          </label>)}
      </fieldset>
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default RadioGroup;
