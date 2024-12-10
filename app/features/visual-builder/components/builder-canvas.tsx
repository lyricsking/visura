import { Container } from "@mantine/core";
import { useVisualBuilder } from "./visual-builder.provider";

export default function ComponentsCanvas() {
  // Use useVisualBuilder hook to obtain components
  const { components, onSelect } = useVisualBuilder();

  const handleClick = (id: string | undefined) => id && onSelect(id);

  return (
    <Container fluid p={"sm"}>
      {/* Check if we have an active component for editing
      and display appropriate settings component */}
      {components.map((component) => (
        <component.component
          key={component.props.id}
          {...component.props}
          onClick={() => handleClick(component.props.id)}
        />
      ))}
    </Container>
  );
}
