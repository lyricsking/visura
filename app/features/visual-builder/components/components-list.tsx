import { ComponentsInfo } from "../types/builder.components";
import { onComponentSelected } from "../utils/fns";
import { useVisualBuilder } from "./visual-builder.provider";

export type ComponentsPanelProps = {
  onComponentSelected: onComponentSelected;
};

export function ComponentsPanel({}: ComponentsPanelProps) {
  const { defaultList } = useVisualBuilder();
  const x = defaultList.reduce(
    (acc: Record<string, ComponentsInfo[]>, item: ComponentsInfo) => {
      const key = String(item.group);

      if (!acc[key]) acc[key] = [];

      acc[key].push(item);
      return acc;
    },
    {}
  );

  const itemsC = Object.entries(x).map(([key, items]) => (
    <>
      {items.map((item) => (
        <item.component key={item.name} {...item.defaultValue} />
      ))}
    </>
  ));

  console.log(itemsC);

  return <>{itemsC}</>;
}
