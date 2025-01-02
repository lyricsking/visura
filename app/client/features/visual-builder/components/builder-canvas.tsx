import {
  Button,
  Center,
  Container,
  Divider,
  ScrollArea,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { useVisualBuilder } from "./visual-builder.provider";
import { cn } from "~/core/utils/util";
import { useDisclosure } from "@mantine/hooks";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { merge } from "lodash";

type ComponentsCanvasProps = {
  onSave: () => void;
};

export default function ComponentsCanvas(props: ComponentsCanvasProps) {
  const { onSave } = props;

  // Use useVisualBuilder hook to obtain components
  const { components, setSelection } = useVisualBuilder();

  const handleClick = (id: string | undefined) => id && setSelection(id);

  return (
    <Container h={"calc(100vh - 112px)"} w={"100%"} p="0">
      <div className="flex items-center justify-center gap-4 px-4 h-[40px] bg-gray-200">
        <div className="flex items-center gap-2 ml-auto">
          <Text size="xs" fw={"bold"}>
            Preview:{" "}
          </Text>
          <SegmentedControl
            defaultValue={"desktop"}
            size="xs"
            data={[
              { label: "Desktop", value: "desktop" },
              { label: "Mobile", value: "mobile" },
            ]}
          />
        </div>

        <Divider
          orientation="vertical"
          mx="-xs"
          color="#d1d1d1"
          size={"xs"}
          variant="solid"
        />

        <Button
          size="compact-sm"
          color="#228be6"
          // color="#cccccc"
          onClick={onSave}
          children="Save"
        />
      </div>
      {/* Check if we have an active component for editing
      and display appropriate settings component */}
      {components && (
        <ScrollArea
          h={"100%"}
          bg="white"
          p={"sm"}
          className={cn("m-4 border rounded-sm")}
        >
          {components.length > 0 ? (
            components.map((component) => (
              <div
                key={component.props.id}
                onClick={() => handleClick(component.props.id)}
              >
                <component.component {...component.props} />
              </div>
            ))
          ) : (
            <Center h={"calc(100vh - 120px)"} w="100%">
              <Text
                c={"dimmed"}
                children="Select a component button on the left sidebar to start editing your page."
                size="xl"
                ta={"center"}
                mx={"xl"}
              />
            </Center>
          )}
        </ScrollArea>
      )}
    </Container>
  );
}
