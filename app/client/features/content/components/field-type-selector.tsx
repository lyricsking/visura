const FieldTypeSelector = ({ onAddField }) => {
  const fieldTypes = ["String", "Number", "Date", "File", "Checkbox", "Array", "Object"];


  return (
    <div>
      <h4>Add Field</h4>
      {fieldTypes.map((type) => (
        <button key={type} onClick={() => onAddField(type)}>
          {type}
        </button>
      ))}
    </div>
  );
};

export default FieldTypeSelector;
