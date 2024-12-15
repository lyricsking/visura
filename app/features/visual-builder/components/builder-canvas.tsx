import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  NavLink,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { useVisualBuilder } from "./visual-builder.provider";
import { cn } from "~/shared/utils/util";

export default function ComponentsCanvas() {
  // Use useVisualBuilder hook to obtain components
  const { components, setSelection } = useVisualBuilder();

  const handleClick = (id: string | undefined) => id && setSelection(id);

  return (
    <Container h={"calc(100vh - 117px)"} w={"100%"} p="0">
      <div className="flex justify-center gap-4 py-4 h-[50px] bg-gray-200">
        <Button size="compact-xs" variant="outline">
          Desktop
        </Button>
        <Button size="compact-xs" variant="outline">
          Mobile
        </Button>
      </div>
      {/* Check if we have an active component for editing
      and display appropriate settings component */}
      {components && components.length > 0 && (
        <ScrollArea
          h={"100%"}
          my="sm"
          bg="white"
          className={cn("m-4 border rounded-sm")}
        >
          {components.map((component) => (
            <div
              key={component.props.id}
              onClick={() => handleClick(component.props.id)}
            >
              <component.component {...component.props} />
            </div>
          ))}
        </ScrollArea>
      )}
    </Container>
  );
}
