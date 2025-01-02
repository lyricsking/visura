import {
  Text,
  Stack,
  Divider,
  Slider,
  NativeSelect,
  Accordion,
  Avatar,
  AvatarProps,
  Button,
  Flex,
  MantineSize,
  StyleProp,
  MantineSpacing,
  Switch,
  Space,
  Textarea,
  Title,
  TitleProps,
  ColorInput,
  ColorPicker,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../../../../core/types/builder.components";
import { MouseEvent } from "react";
import { getNanoid } from "~/core/utils/util";
import { marks } from "../utils/marks";
import { TextSettingsProps, textInfo } from "./text";
import { colorSwatch } from "../utils/color";

interface ItemProps {
  id: string;
  titleProps: TitleProps;
  subtitleProps: TextSettingsProps["props"];
  avatar: AvatarProps;
}

type PostionType = "start" | "column" | "end";

type PostionValue = {
  align: StyleProp<React.CSSProperties["alignItems"]>;
  itemAlign: StyleProp<React.CSSProperties["alignItems"]>;
  justify: StyleProp<React.CSSProperties["justifyContent"]>;
  direction: StyleProp<React.CSSProperties["flexDirection"]>;
};

type ItemCardItemProps = {
  position: PostionType;
  gap?: StyleProp<MantineSize | (string & {}) | number>;
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
  items: ItemProps[];
  divider: boolean;
};

type ItemCardSettingsProps = ComponentsInfo<
  BaseComponentsInfoProps & ItemCardItemProps
>;

const positionMap: Record<PostionType, PostionValue> = {
  start: {
    align: "center",
    itemAlign: "start",
    justify: "start",
    direction: "row",
  },
  column: {
    align: "center",
    itemAlign: "center",
    justify: "center",
    direction: "column",
  },
  end: {
    align: "center",
    itemAlign: "start",
    justify: "center",
    direction: "row-reverse",
  },
};

const defaultItem: Omit<ItemProps, "id"> = {
  titleProps: { c: "#474747", children: "Heading text", order: 6 },
  subtitleProps: {
    ...textInfo["props"],
    children: "Subheading",
    size: "sm",
    color: "#474747",
    ta: "start",
  },
  avatar: {
    name: "Avatar",
    color: "initials",
    alt: "Avatar alt text",
    radius: "md",
    variant: "",
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
    items: [{ ...defaultItem, id: getNanoid(5) }],
    position: "start",
    divider: true,
    mx: 0,
  },
};

function ItemCard(props: ItemCardSettingsProps["props"]) {
  const { divider, gap, items, mx, position } = props;

  const { align, direction, itemAlign } = positionMap[position];

  const itemsComponent = items.map((item, index) => {
    const { titleProps, subtitleProps } = item;

    return (
      <div key={item.id}>
        {divider && index !== 0 && <Divider mb={gap} />}

        <Space h={gap} />

        <Flex align={align} direction={direction} gap={"xs"}>
          <Avatar {...item.avatar} />

          <Flex direction="column" align={itemAlign} gap={0} className="flex-1">
            <Title {...titleProps} />
            <Text {...subtitleProps} />
          </Flex>
        </Flex>

        <Space h={gap} />
      </div>
    );
  });

  return (
    <Flex direction="column" justify={"space-between"} gap={gap} mx={mx}>
      {itemsComponent}
    </Flex>
  );
}

export function ItemCardSetting(props: ItemCardSettingsProps["props"]) {
  const { id, divider, gap, position, mx, items, onPropsUpdate } = props;

  function addFAQItem(event: MouseEvent<HTMLButtonElement>): void {
    const newItems = [...items, { ...defaultItem, id: getNanoid(5) }];

    return onPropsUpdate(id!, "items", newItems);
  }

  const newPropsUpdate = (
    id: string,
    index: number,
    item: any,
    sectionKey: string,
    key: string,
    value: any
  ) => {
    const newItems = [...items];
    newItems[index] = {
      ...item,
      [sectionKey]: {
        ...item[sectionKey],
        [key]: value,
      },
    };
    onPropsUpdate(id!, "items", newItems);
  };

  return (
    <Stack>
      <NativeSelect
        label="Position"
        defaultValue={String(position)}
        onChange={(event: any) =>
          onPropsUpdate(id!, "position", String(event.currentTarget.value))
        }
        data={[
          {
            label: "Start",
            value: "start",
          },

          {
            label: "Column",
            value: "column",
          },
          { label: "End", value: "end" },
        ]}
      />

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

      <Switch
        defaultChecked={divider}
        label="Enable Divider"
        labelPosition="left"
        onChange={(event) =>
          onPropsUpdate(id!, "divider", event.currentTarget.checked)
        }
      />

      <Accordion defaultValue={"0"} variant="contained" bg="white">
        {items.map((item, index) => {
          const { c, children, lineClamp, order } = item.titleProps;

          return (
            <Accordion.Item key={item.id} value={String(index)}>
              <Accordion.Control>Item {index + 1}</Accordion.Control>
              <Accordion.Panel>
                <Stack>
                  <Title children="Avatar" order={5} />

                  <TextInput
                    label="Avatar Image Url"
                    description="Specify image url."
                    defaultValue={item.avatar.src ?? undefined}
                    placeholder="http://www.example.com/placeholder.jpg"
                    onChange={(event) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "avatar",
                        "src",
                        event.currentTarget.value
                      )
                    }
                  />

                  <TextInput
                    label="Avatar Image Alt"
                    description="Specify avatar image alt text."
                    defaultValue={item.avatar.alt}
                    placeholder="Image Alt"
                    onChange={(event) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "avatar",
                        "alt",
                        event.currentTarget.value
                      )
                    }
                  />

                  <Divider />

                  <TextInput
                    label="Optional Avatar Name"
                    description="Specify this if you want to display user initials"
                    defaultValue={item.avatar.name as string}
                    onChange={(event) => {
                      const value = event.currentTarget.value;
                      if (value) {
                        newPropsUpdate(
                          id!,
                          index,
                          item,
                          "avatar",
                          "color",
                          "initials"
                        );
                      }
                      return newPropsUpdate(
                        id!,
                        index,
                        item,
                        "avatar",
                        "name",
                        value
                      );
                    }}
                  />

                  <Divider />

                  <NativeSelect
                    label="Avatar Type"
                    description="Specify avatar variant."
                    defaultValue={item.avatar.variant}
                    onChange={(event) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "avatar",
                        "variant",
                        event.currentTarget.value
                      )
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

                  <NativeSelect
                    label="Radius"
                    description="Specify the image radius"
                    defaultValue={item.avatar.radius}
                    onChange={(event) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "avatar",
                        "radius",
                        event.currentTarget.value
                      )
                    }
                    data={["xs", "sm", "md", "lg", "xl"]}
                  />

                  <Divider mb="md" />

                  <Title children="Heading" order={5} />

                  <NativeSelect
                    label="Heading type"
                    description="Specify the text size"
                    defaultValue={order}
                    onChange={(event: any) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "titleProps",
                        "order",
                        Number(event.currentTarget.value)
                      )
                    }
                    data={[
                      { label: "H1", value: "1" },
                      { label: "H2", value: "2" },
                      { label: "H3", value: "3" },
                      { label: "H4", value: "4" },
                      { label: "H5", value: "5" },
                      { label: "H6", value: "6" },
                    ]}
                  />

                  <Textarea
                    label="Heading text"
                    description="Enter heading text below"
                    placeholder="Title"
                    defaultValue={String(children)}
                    onChange={(event: any) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "titleProps",
                        "children",
                        event.currentTarget.value
                      )
                    }
                  />

                  <Divider />

                  <ColorInput
                    defaultValue={c as string}
                    onChange={(value: any) =>
                      newPropsUpdate(id!, index, item, "titleProps", "c", value)
                    }
                    label="Text color"
                    description="Pick a text color, Click the picker icon on the right to pick from anywhere in the screen"
                  />

                  <Divider />

                  <NativeSelect
                    label="Line Clamp"
                    description="Specify the number of lines after which Text will be truncated"
                    defaultValue={lineClamp}
                    onChange={(event: any) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "titleProps",
                        "lineClamp",
                        Number(event.currentTarget.value)
                      )
                    }
                    data={["none", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                  />

                  <Divider my={"md"} />

                  <Title children="Subheading" order={5} />

                  <Textarea
                    label="Text"
                    description="Enter text below"
                    placeholder="Enter text here"
                    defaultValue={String(item.subtitleProps.children)}
                    onChange={(event) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "subtitleProps",
                        "children",
                        event.currentTarget.value
                      )
                    }
                  />

                  <div>
                    <Text size="sm" fw={500} mb={3}>
                      Span
                    </Text>
                    <SegmentedControl
                      defaultValue={item.subtitleProps.span ? "true" : "false"}
                      size="xs"
                      onChange={(value: any) =>
                        newPropsUpdate(
                          id!,
                          index,
                          item,
                          "subtitleProps",
                          "span",
                          value === "true"
                        )
                      }
                      data={[
                        { label: "Span", value: "true" },
                        { label: "Paragraph", value: "false" },
                      ]}
                    />
                  </div>

                  <div>
                    <Text size="sm" fw={500} mb={3}>
                      Text Style
                    </Text>
                    <SegmentedControl
                      defaultValue={item.subtitleProps.variant}
                      size="xs"
                      onChange={(value: string) =>
                        newPropsUpdate(
                          id!,
                          index,
                          item,
                          "subtitleProps",
                          "variant",
                          value
                        )
                      }
                      data={[
                        { label: "Text", value: "text" },
                        { label: "Gradient", value: "gradient" },
                      ]}
                    />
                  </div>

                  <Divider />

                  <ColorInput
                    defaultValue={item.subtitleProps.color as string}
                    onChange={(value: any) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "subtitleProps",
                        "c",
                        value
                      )
                    }
                    label="Text color"
                    description="Pick a text color, Click the picker icon on the right to pick from anywhere in the screen"
                  />

                  {item.subtitleProps.variant === "gradient" ? (
                    <>
                      <div>
                        <Text size="sm" fw={500} mb={1}>
                          Gradient From
                        </Text>

                        <ColorPicker
                          defaultValue={item.subtitleProps.gradient?.from}
                          onChange={(value: any) =>
                            newPropsUpdate(
                              id!,
                              index,
                              item,
                              "subtitleProps",
                              "gradient",
                              {
                                from: value,
                                to: item.subtitleProps.gradient?.to,
                                deg: item.subtitleProps.gradient?.deg,
                              }
                            )
                          }
                          format="hex"
                          fullWidth
                          swatches={colorSwatch}
                        />
                      </div>

                      <div>
                        <Text size="sm" fw={500}>
                          Gradient To
                        </Text>

                        <ColorPicker
                          defaultValue={item.subtitleProps.gradient?.to}
                          onChange={(value: any) =>
                            newPropsUpdate(
                              id!,
                              index,
                              item,
                              "subtitleProps",
                              "gradient",
                              {
                                from: item.subtitleProps.gradient?.from,
                                to: value,
                                deg: item.subtitleProps.gradient?.deg,
                              }
                            )
                          }
                          format="hex"
                          fullWidth
                          swatches={colorSwatch}
                        />
                      </div>

                      <div>
                        <Text size="sm" fw={500}>
                          Gradient degree
                        </Text>
                        <Slider
                          color={"blue"}
                          defaultValue={item.subtitleProps.gradient?.deg}
                          onChange={(value: any) =>
                            newPropsUpdate(
                              id!,
                              index,
                              item,
                              "subtitleProps",
                              "gradient",
                              {
                                from: item.subtitleProps.gradient?.from,
                                to: item.subtitleProps.gradient?.to,
                                deg: value,
                              }
                            )
                          }
                          min={0}
                          max={360}
                          step={10}
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <Text size="sm" fw={500}>
                        Color
                      </Text>

                      <ColorPicker
                        defaultValue={item.subtitleProps.color}
                        onChange={(value) =>
                          newPropsUpdate(
                            id!,
                            index,
                            item,
                            "subtitleProps",
                            "c",
                            value
                          )
                        }
                        format="hex"
                        withPicker={false}
                        fullWidth
                        swatches={colorSwatch}
                      />
                    </div>
                  )}

                  <Divider />

                  <NativeSelect
                    label="Size"
                    description="Specify the text size"
                    defaultValue={item.subtitleProps.size}
                    onChange={(event: any) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "subtitleProps",
                        "size",
                        event.currentTarget.value
                      )
                    }
                    data={["xs", "sm", "md", "lg", "xl"]}
                  />

                  <NativeSelect
                    label="Line Clamp"
                    description="Specify the number of lines after which Text will be truncated"
                    defaultValue={lineClamp}
                    onChange={(event: any) =>
                      newPropsUpdate(
                        id!,
                        index,
                        item,
                        "subtitleProps",
                        "lineClamp",
                        Number(event.currentTarget.value)
                      )
                    }
                    data={["none", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                  />
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>

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
    </Stack>
  );
}
