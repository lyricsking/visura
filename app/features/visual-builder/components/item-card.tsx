import {
  Text,
  Stack,
  Divider,
  Slider,
  NativeSelect,
  AccordionProps,
  Accordion,
  Group,
  Avatar,
  AvatarProps,
  TextInput,
  Button,
  Flex,
  FlexProps,
  MantineSize,
  StyleProp,
  MantineSpacing,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { MouseEvent } from "react";
import { getNanoid } from "~/shared/utils/util";
import { marks } from "../utils/marks";

interface ItemCardItemProps {
  id: string;
  title: string;
  subtitle: string;
  avatar: AvatarProps;
}

type PostionProps = {
  gap?: StyleProp<MantineSize | (string & {}) | number>;
  position?: "start" | "column" | "end";
  /** `align-items` CSS property */
  align?: StyleProp<React.CSSProperties["alignItems"]>;
  /** `justify-content` CSS property */
  justify?: StyleProp<React.CSSProperties["justifyContent"]>;
  /** `flex-wrap` CSS property */
  wrap?: StyleProp<React.CSSProperties["flexWrap"]>;
  /** `flex-direction` CSS property */
  direction?: StyleProp<React.CSSProperties["flexDirection"]>;
  /** MarginBlock, theme key: theme.spacing */
  my?: StyleProp<MantineSpacing>;
  /** MarginInline, theme key: theme.spacing */
  mx?: StyleProp<MantineSpacing>;
};

type ItemCardSettingsProps = ComponentsInfo<
  BaseComponentsInfoProps &
    // FlexProps &
    PostionProps & {
      items: ItemCardItemProps[];
    }
>;

const defaultItem = {
  id: getNanoid(5),
  title: "Heading",
  subtitle: "Subheading",
  avatar: {
    name: undefined,
    color: "initials",
    alt: "Avatar alt text",
    radius: "md",
    variant: "",
    src: "https://placehold.co/600x400?text=Placeholder",
  },
};

export const itemCardInfo: ItemCardSettingsProps = {
  name: "Item Card",
  group: "display",
  component: ItemCard,
  settingsComponent: ItemCardSetting,
  props: {
    onPropsUpdate: () => {},
    gap: "xs",
    items: [defaultItem],
  },
};

function ItemCard(props: ItemCardSettingsProps["props"]) {
  const { gap, items, position } = props;

  const itemsComponent = items.map((item) => {
    return (
      <Flex align={position} key={item.title}>
        <Avatar {...item.avatar} />

        <Flex direction="column" gap={0}>
          <Text>{item.title}</Text>
          <Text size="sm" c="dimmed" fw={400}>
            {item.subtitle}
          </Text>
        </Flex>
      </Flex>
    );
  });

  return (
    <Flex direction="column" gap={gap}>
      {itemsComponent}
    </Flex>
  );
}

export function ItemCardSetting(props: ItemCardSettingsProps["props"]) {
  const { id, gap, justify, align, my, mx, items, onPropsUpdate } = props;

  function addFAQItem(event: MouseEvent<HTMLButtonElement>): void {
    const newItems = [...items, defaultItem];

    return onPropsUpdate(id!, "items", newItems);
  }

  return (
    <Accordion defaultValue="flex" variant="contained">
      <Accordion.Item value={"title"}>
        <Accordion.Control>Layout Section</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <div>
              <Text size="sm" fw={500}>
                Items Spacing
              </Text>
              <Slider
                defaultValue={marks.find((mark) => mark.label === gap)!.value}
                label={(val) => marks.find((mark) => mark.value === val)!.label}
                step={20}
                marks={marks}
                onChange={(value: number) => {
                  onPropsUpdate(
                    id!,
                    "gap",
                    marks.find((mark) => mark.value === value)!.label
                  );
                }}
                styles={{ markLabel: { display: "none" } }}
              />
            </div>

            <NativeSelect
              label="Position"
              defaultValue={String(position)}
              onChange={(event: any) =>
                onPropsUpdate(id!, "justify", String(event.currentTarget.value))
              }
              data={["Start", "Center", "End"]}
            />

            <NativeSelect
              label="Align"
              defaultValue={String(align)}
              onChange={(event: any) =>
                onPropsUpdate(id!, "align", String(event.currentTarget.value))
              }
              data={["Start", "Center", "End"]}
            />

            <NativeSelect
              label="Direction"
              defaultValue={String(align)}
              onChange={(event: any) =>
                onPropsUpdate(
                  id!,
                  "direction",
                  String(event.currentTarget.value)
                )
              }
              data={[
                { label: "Row", value: "row" },
                { label: "Column", value: "column" },
                { label: "Row Reversed", value: "row-reverse" },
              ]}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={"items"}>
        <Accordion.Control>Items Section</Accordion.Control>
        <Accordion.Panel>
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
                description="Specify heading text."
                defaultValue={item.title}
                onChange={(event) => {
                  const newItems = items.map((yitem) => {
                    const newItem = { ...yitem };
                    if (yitem.id === item.id)
                      newItem.title = event.currentTarget.value;
                    return newItem;
                  });
                  return onPropsUpdate(id!, "items", newItems);
                }}
              />

              <TextInput
                label="Subheading text"
                description="Specify subheading text."
                placeholder="Subheading text"
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

              <Divider />

              <div>
                <Text size="sm" fw={500}>
                  Vertical Spacing
                </Text>
                <Slider
                  defaultValue={Number(my)}
                  step={1}
                  min={0}
                  max={40}
                  onChange={(value: number) => onPropsUpdate(id!, "my", value)}
                  styles={{ markLabel: { display: "none" } }}
                />
              </div>

              <div>
                <Text size="sm" fw={500}>
                  Horizontal Spacing
                </Text>
                <Slider
                  defaultValue={Number(mx)}
                  step={1}
                  min={0}
                  max={40}
                  onChange={(value: number) => onPropsUpdate(id!, "mx", value)}
                  styles={{ markLabel: { display: "none" } }}
                />
              </div>

              <Divider />

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
              {index < items.length && <Divider />}
            </Stack>
          ))}
        </Accordion.Panel>
      </Accordion.Item>

      {/* Title and subtile settings */}

      <Button
        variant={"outline"}
        my={"sm"}
        px="2"
        radius={"2"}
        fullWidth
        className="capitalize shadow-md"
        onClick={addFAQItem}
      >
        Add item
      </Button>
    </Accordion>
  );
}
