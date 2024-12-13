import { useVisualBuilder } from "./visual-builder.provider";

export default function ComponentsCanvas() {
  // Use useVisualBuilder hook to obtain components
  const { components, setSelection } = useVisualBuilder();

  const handleClick = (id: string | undefined) => id && setSelection(id);

  return (
    <>
      {/* Check if we have an active component for editing
      and display appropriate settings component */}
      {components.map((component) => (
        <div
          key={component.props.id}
          onClick={() => handleClick(component.props.id)}
        >
          <component.component {...component.props} />
        </div>
      ))}
    </>
  );
}
