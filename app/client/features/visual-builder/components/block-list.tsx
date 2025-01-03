import { Button, Divider, Text } from "@mantine/core";
import { ComponentsInfo } from "../../../../core/types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";

export function BlockList() {
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
      <div key={key} className="grid">
        {index !== 0 && <Divider my="sm" />}

        <Text children={key} className="capitalize" />

        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <Button
              key={item.name}
              variant={"outline"}
              px="6"
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

  return <div>{componentsListElement}</div>;
}
