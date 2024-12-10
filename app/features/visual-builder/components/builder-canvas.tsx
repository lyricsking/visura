import { useVisualBuilder } from "./visual-builder.provider";

export default function ComponentsCanvas() {
  // Use useVisualBuilder hook to obtain components
  const { components, onSelect } = useVisualBuilder();

  const handleClick = (id: string | undefined) => id && onSelect(id);

  return (
    <>
      {/* Check if we have an active component for editing
      and display appropriate settings component */}
      {components.map((component) => (
        <div key={component.props.id}>
          <component.component
            {...component.props}
            onClick={() => handleClick(component.props.id)}
          />
        </div>
      ))}
    </>
  );
}
