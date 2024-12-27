const ContentTypePreview = ({ fields }) => (
  <div>
    <h4>Preview</h4>
    {fields.map((field) => (
      <div key={field.id}>
        <label>{field.label || "Unnamed Field"}</label>
        {["Object", "Array"].includes(field.type) ? (
          <ContentTypePreview fields={field.fields || []} />
        ) : (
          <input type={field.type.toLowerCase()} disabled />
        )}
      </div>
    ))}
  </div>
);

export default ContentTypePreview;
