import {
  Button,
  Center,
  ComboboxData,
  Container,
  Divider,
  NativeSelect,
  ScrollArea,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { useVisualBuilder } from "./visual-builder.provider";
import { cn } from "~/shared/utils/util";
import { IPageWithOptionalId } from "~/features/page/types/page";
import { ChangeEvent } from "react";
import { useNavigate, useParams, useSearchParams } from "@remix-run/react";
import { Trash2Icon, TrashIcon } from "lucide-react";

type ComponentsCanvasProps = {
  pages: IPageWithOptionalId[];
  onSave: () => void;
};

export default function ComponentsCanvas(props: ComponentsCanvasProps) {
  const { pages, onSave } = props;

  const { pageId } = useParams();
  const navigate = useNavigate();

  // Use useVisualBuilder hook to obtain components
  const { components, setSelection } = useVisualBuilder();

  const handleClick = (id: string | undefined) => id && setSelection(id);

  function handlePageSwitch(event: ChangeEvent<HTMLSelectElement>): void {
    const pageId = event.currentTarget.value;
    navigate(`../${pageId}`, { relative: "path", replace: true });
  }

  const dataMap: any[] = [
    { label: "Select a page", value: "", disabled: true },
  ];

  pages.forEach((page) => {
    dataMap.push({
      label: page.metadata.title,
      value: page._id?.toString() || "",
    });
  });

  return (
    <Container h={"calc(100vh - 112px)"} w={"100%"} p="0">
      <div className="flex items-center justify-center gap-4 px-4 h-[40px] bg-gray-200">
        <NativeSelect
          defaultValue={pageId}
          data={dataMap}
          onChange={handlePageSwitch}
        />

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
        <Button size="compact-sm" color="red">
          <Trash2Icon size={15} />
        </Button>
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
