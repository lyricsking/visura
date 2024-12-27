const FieldEditor = ({ field, onUpdateField, onDeleteField }) => {
  const updateField = (key, value) => {
    onUpdateField({ ...field, [key]: value });
  };

  const addNestedField = () => {
    const nestedField = { id: Date.now(), type: "Text", label: "", required: false };
    updateField("fields", [...(field.fields || []), nestedField]);
  };

  const updateNestedField = (id, updatedField) => {
    const updatedFields = field.fields.map((f) => (f.id === id ? updatedField : f));
    updateField("fields", updatedFields);
  };

  const deleteNestedField = (id) => {
    const updatedFields = field.fields.filter((f) => f.id !== id);
    updateField("fields", updatedFields);
  };

  return (
    <div>
      <h5>Field: {field.type}</h5>
      <input
        type="text"
        placeholder="Label"
        value={field.label}
        onChange={(e) => updateField("label", e.target.value)}
      />
      <label>
        Required
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => updateField("required", e.target.checked)}
        />
      </label>

      {/* Handle Object and Array Fields */}
      {["Object", "Array"].includes(field.type) && (
        <div>
          <h6>Nested Fields</h6>
          <button onClick={addNestedField}>Add Nested Field</button>
          {field.fields?.map((nestedField) => (
            <FieldEditor
              key={nestedField.id}
              field={nestedField}
              onUpdateField={(updatedField) => updateNestedField(nestedField.id, updatedField)}
              onDeleteField={() => deleteNestedField(nestedField.id)}
            />
          ))}
        </div>
      )}

      <button onClick={onDeleteField}>Delete</button>
    </div>
  );
};
