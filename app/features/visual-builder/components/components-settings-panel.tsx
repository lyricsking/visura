import { useVisualBuilder } from "./visual-builder.provider";

export function ComponentSettingsPanel() {
  // Use useVisualBuilder hook to obtain components
  const { selection, components } = useVisualBuilder();
  // Find the currently selected component by it's id.
  const editingComp = components.find(
    (component) => component.props.id === selection
  );

  return (
    <div>
      {/* Check if we have an active component for editing
      and display appropriate settings component */}
      {editingComp && (
        <editingComp.settingsComponent
          key={editingComp.props.id}
          {...editingComp.props}
        />
      )}
    </div>
  );
}
