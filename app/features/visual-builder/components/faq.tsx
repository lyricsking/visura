import {
  Text,
  TextProps,
  Stack,
  SegmentedControl,
  Divider,
  ColorInput,
  ColorPicker,
  Slider,
  NativeSelect,
  AccordionProps,
  Accordion,
  Group,
  Avatar,
  AvatarProps,
  TextInput,
  Button,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";
import { color } from "@codemirror/theme-one-dark";
import { MouseEvent } from "react";
import { getNanoid } from "~/shared/utils/util";

interface FAQsItemProps {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  avatar: AvatarProps;
}
interface FAQsProps {
  accordion: AccordionProps;
  items: FAQsItemProps[];
}

export const faqInfo: MantineFAQSettingsProps = {
  name: "FAQs",
  group: "display",
  component: FAQs,
  settingsComponent: MantineFAQSetting,
  props: {
    onPropsUpdate: () => {},
    accordion: {},
    items: [
      {
        id: getNanoid(5),
        title: "Default label",
        subtitle: "DEscription",
        content: "Content",
        avatar: {
          name: "",
          color: "initials",
          alt: "Avatar alt text",
          radius: "md",
          variant: "",
          src: "",
        },
      },
    ],
  },
};

function FAQs({ accordion, items }: FAQsProps) {
  const itemsComponent = items.map((item) => (
    <Accordion.Item value={item.id} key={item.title}>
      <Accordion.Control>
        <Group wrap="nowrap">
          <Avatar {...item.avatar} />
          <div>
            <Text>{item.title}</Text>
            <Text size="sm" c="dimmed" fw={400}>
              {item.subtitle}
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" order={3} p={"sm"}>
      {itemsComponent}
    </Accordion>
  );
}

type MantineFAQSettingsProps = ComponentsInfo<
  FAQsProps & BaseComponentsInfoProps
>;

export function MantineFAQSetting({
  ...props
}: MantineFAQSettingsProps["props"]) {
  const { id, accordion, items,onPropsUpdate } = props;

  const {} = accordion;
  // const { alt, src, name, radius, variant } = it;

  function addFAQItem(event: MouseEvent<HTMLButtonElement>): void {
    const v = {
      id: getNanoid(5),
      title: "Default label",
      subtitle: "DEscription",
      content: "Content",
      avatar: {
        name: undefined,
        color: "initials",
        alt: "Avatar alt text",
        radius: "md",
        variant: "",
        src: "https://placehold.co/600x400?text=Placeholder",
      },
    };

    const newItems = [...items, v];

    return onPropsUpdate(id!, "items", newItems);
  }

  return (
    <Stack mb={35}>
      {/* Title and subtile settings */}
      <Text children="Faq Items" size="lg" fw={"bold"} className="capitalize" />

      {items.map((item, index) => (
        <Stack>
          <Text
            children={`Item ${index + 1}`}
            size="md"
            fw={"bold"}
            className="capitalize"
          />

          <TextInput
            label="Heading text"
            description="Specify header text."
            defaultValue={item.title}
            onChange={(event) => {
              const newItems = items.map((yitem) => {
                const newItem = { ...yitem };
                if (yitem.id === item.id) {
                  newItem.title = event.currentTarget.value;
                }
                return newItem;
              });
              return onPropsUpdate(id!, "items", newItems);
            }}
          />

          <TextInput
            label="Subheading text"
            description="Specify header text."
            defaultValue={item.subtitle}
            onChange={(event) => {
              const newItems = items.map((yitem) => {
                const newItem = { ...yitem };
                if (yitem.id === item.id) {
                  newItem.subtitle = event.currentTarget.value;
                }
                return newItem;
              });
              return onPropsUpdate(id!, "items", newItems);
            }}
          />

          <TextInput
            label="Avatar Image Url"
            description="Specify image url."
            defaultValue={item.avatar.src ?? undefined}
            placeholder="http://www.example.com/placeholder.jpg"
            onChange={(event) => {
              const newItems = items.map((yitem) => {
                const newItem = { ...yitem };
                if (yitem.id === item.id) {
                  newItem.avatar.src = event.currentTarget.value;
                }
                return newItem;
              });
              return onPropsUpdate(id!, "items", newItems);
            }}
          />

          <TextInput
            label="Avatar Image Alt"
            description="Specify avatar image alt text."
            defaultValue={item.avatar.alt}
            placeholder="Image Alt"
            onChange={(event) => {
              const newItems = items.map((yitem) => {
                const newItem = { ...yitem };
                if (yitem.id === item.id) {
                  newItem.avatar.alt = event.currentTarget.value;
                }
                return newItem;
              });
              return onPropsUpdate(id!, "items", newItems);
            }}
          />

          <TextInput
            label="Optional Avatar Name"
            description="Specify this if you want to display user initials"
            defaultValue={item.avatar.name as string}
            onChange={(event) => {
              const newItems = items.map((yitem) => {
                const newItem = { ...yitem };
                if (yitem.id === item.id) {
                  newItem.avatar.name = event.currentTarget.value;
                  if (newItem.avatar.name) {
                    newItem.avatar.color = "initials";
                  }
                }
                return newItem;
              });
              return onPropsUpdate(id!, "items", newItems);
            }}
          />

          <NativeSelect
            label="Avatar Type"
            description="Specify avatar variant."
            defaultValue={item.avatar.variant}
            onChange={(event) =>
              onPropsUpdate(id!, "avatar", {
                ...item.avatar,
                variant: event.currentTarget.value,
              })
            }
            data={[
              { label: "Default", value: "default" },
              { label: "Filled", value: "filled" },
              { label: "Light", value: "light" },
              { label: "Outline", value: "outline" },
              { label: "Transparent", value: "transparent" },
              { label: "White", value: "white" },
            ]}
          />

          <NativeSelect
            label="Radius"
            description="Specify the image radius"
            defaultValue={item.avatar.radius}
            onChange={(event) =>
              onPropsUpdate(id!, "avatar", {
                ...item.avatar,
                radius: event.currentTarget.value,
              })
            }
            data={["xs", "sm", "md", "lg", "xl"]}
          />
          {index < items.length && <Divider my="md" />}
        </Stack>
      ))}

      <Button
        variant={"outline"}
        px="2"
        radius={"2"}
        className="capitalize shadow-md"
        onClick={addFAQItem}
      >
        Add item
      </Button>
    </Stack>
  );
}
