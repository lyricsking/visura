import { ActionIcon } from "@mantine/core";
import { useVisualBuilder } from "./visual-builder.provider";
import { Delete, Trash, Trash2 } from "lucide-react";
import { componentsMap } from "~/shared/block";

export function ComponentSettingsPanel() {
  // Use useVisualBuilder hook to obtain components
  const { selection, components, deleteComponent, updateProps } =
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
        <div className="w-full flex flex-col gap-2 flex-wrap">
          <div className="flex justify-end">
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
            onPropsUpdate={updateProps}
          />
        </div>
      )}
    </div>
  );
}
