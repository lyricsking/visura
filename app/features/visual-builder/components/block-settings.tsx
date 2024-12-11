import { ActionIcon } from "@mantine/core";
import { useVisualBuilder } from "./visual-builder.provider";
import { Delete, Trash, Trash2 } from "lucide-react";
import { componentsMap } from "~/shared/block";

export function ComponentSettingsPanel() {
  // Use useVisualBuilder hook to obtain components
  const { selection, components, deleteComponent, updateComponent } =
    useVisualBuilder();
  // Find the currently selected component by it's id.
  const editingComp = components.find(
    (component) => component.props.id === selection
  );

  return (
    <div>
      {/* Check if we have an active component for editing
      and display appropriate settings component */}
      {editingComp && (
        <div className="relative w-full">
          <div className="absolute top-0 right-0">
            <ActionIcon
              variant="filled"
              bg={"red"}
              aria-label="Delete"
              onClick={() => deleteComponent(editingComp.props.id!)}
            >
              <Trash2 style={{ width: "70%", height: "70%" }} />
            </ActionIcon>
          </div>

          <editingComp.settingsComponent
            key={editingComp.props.id}
            {...editingComp.props}
            updateComponent={updateComponent}
          />
        </div>
      )}
    </div>
  );
}
