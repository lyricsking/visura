import { useVisualBuilder } from "./visual-builder.provider";

export default function ComponentsCanvas() {
  // Use useVisualBuilder hook to obtain components
  const { components } = useVisualBuilder();

  return (
    <div>
      {/* Check if we have an active component for editing
      and display appropriate settings component */}
      {components.map((component, index) => (
        <component.component key={component.props.id} {...component.props} />
      ))}
    </div>
  );
}
