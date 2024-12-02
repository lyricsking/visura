import { onComponentSelected } from "../utils/fns";
import { useVisualBuilder } from "./visual-builder.provider";

export type ComponentsPanelProps = {
  onComponentSelected: onComponentSelected;
};

export function ComponentsPanel({}: ComponentsPanelProps) {
  const { defaultList } = useVisualBuilder();
  
  return <></>;
}
