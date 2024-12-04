import { Button, Divider, Text } from "@mantine/core";
import { ComponentsInfo } from "../types/builder.components";
import { AddComponent } from "../utils/fns";
import { useVisualBuilder } from "./visual-builder.provider";

export type ComponentsPanelProps = {
  // addComponent: AddComponent;
};

export function ComponentsPanel({}: ComponentsPanelProps) {
  const { defaultList, addComponent } = useVisualBuilder();

  const componentsMap = defaultList.reduce(
    (acc: Record<string, ComponentsInfo[]>, component: ComponentsInfo) => {
      const key = String(component.group);

      if (!acc[key]) acc[key] = [];

      acc[key].push(component);
      return acc;
    },
    {}
  );

  const componentsListElement = Object.entries(componentsMap).map(
    ([key, items], index) => (
      <div key={key} className="grid gap-4">
        {index !== 0 && <Divider my="md" />}

        <Text children={key} className="capitalize" />

        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <Button
              key={item.name}
              variant={"outline"}
              px="2"
              radius={"2"}
              className="capitalize shadow-md"
              onClick={() => addComponent(item.name)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    )
  );

  return <div className=" rounded-md">{componentsListElement}</div>;
}
