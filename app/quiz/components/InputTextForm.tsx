// InputText.js
import React, { useRef } from 'react';

const InputTextForm = ({label, name, onsubmit, submitLabel, value}: TextInputFormType) => {
  const formRef = useRef(null);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const textInput = formData.get(name);
    console.log('Text input:', textInput);
    onsubmit(textInput);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} defaultValue={value} />
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default InputText;
