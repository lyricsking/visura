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
  Switch,
  Space,
  Textarea,
  Title,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { MouseEvent } from "react";
import { getNanoid } from "~/shared/utils/util";
import { marks } from "../utils/marks";
import {
  MantineTitleSetting,
  MantineTitleSettingsProps,
  titleInfo,
} from "./title";
import { MantineTextSetting, MantineTextSettingsProps, textInfo } from "./text";

interface ItemCardItemProps {
  id: string;
  title: string;
  subtitle: string;
  avatar: AvatarProps;
}

type PostionType = "start" | "column" | "end";

type PostionProps = {
  position: PostionType;
};

type PostionValue = {
  align: StyleProp<React.CSSProperties["alignItems"]>;
  itemAlign: StyleProp<React.CSSProperties["alignItems"]>;
  justify: StyleProp<React.CSSProperties["justifyContent"]>;
  direction: StyleProp<React.CSSProperties["flexDirection"]>;
};

type ItemCardSettingsProps = ComponentsInfo<
  BaseComponentsInfoProps &
    PostionProps & {
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
      items: ItemCardItemProps[];
      divider: boolean;
      titleProps: MantineTitleSettingsProps["props"];
      subtitleTextProps: MantineTextSettingsProps["props"];
    }
>;

const postionMap: Record<PostionType, PostionValue> = {
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
    items: [{ ...defaultItem }],
    position: "start",
    divider: true,
    mx: 0,
    titleProps: { ...titleInfo["props"], order: 6 },
    subtitleTextProps: {
      ...textInfo["props"],
      size: "sm",
      c: "#474747",
      ta: "center",
    },
  },
};

function ItemCard(props: ItemCardSettingsProps["props"]) {
  const {
    id,
    divider,
    gap,
    items,
    mx,
    position,
    subtitleTextProps,
    titleProps,
  } = props;

  const { align, direction, itemAlign, justify } = postionMap[position];

  const { children, ...titleAttrs } = titleProps;

  const itemsComponent = items.map((item, index) => {
    return (
      <div>
        {divider ? (
          index !== 0 ? (
            <Divider mb={gap} />
          ) : (
            <Space h={gap} />
          )
        ) : null}

        <Flex key={item.id} align={align} direction={direction} gap={"xs"}>
          <Avatar {...item.avatar} />

          <Flex direction="column" align={itemAlign} gap={0}>
            <Title {...titleAttrs}>{children}</Title>
            <Text {...subtitleTextProps} />
          </Flex>
        </Flex>
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
  const {
    id,
    divider,
    gap,
    position,
    justify,
    align,
    my,
    mx,
    items,
    titleProps,
    subtitleTextProps,
    onPropsUpdate,
  } = props;

  function addFAQItem(event: MouseEvent<HTMLButtonElement>): void {
    const newItems = [...items, { ...defaultItem, id: getNanoid(5) }];

    return onPropsUpdate(id!, "items", newItems);
  }

  const newPropsUpdate = (
    id: string,
    section: string,
    sectionValue: any,
    key: string,
    value: any
  ) => {
    // alert(JSON.stringify({ id, section, sectionValue, key, value }, null, 2));

    onPropsUpdate(id!, section, {
      ...sectionValue,
      [key]: value,
    });
  };

  return (
    <Accordion defaultValue="flex" variant="contained">
      <Accordion.Item value={"title"}>
        <Accordion.Control>Layout Section</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <NativeSelect
              label="Position"
              defaultValue={String(position)}
              onChange={(event: any) =>
                onPropsUpdate(
                  id!,
                  "position",
                  String(event.currentTarget.value)
                )
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
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={"items"}>
        <Accordion.Control>Items Section</Accordion.Control>
        <Accordion.Panel>
          {items.map((item, index) => (
            <Stack>
              <Title children="Heading Settings" order={5} />

              <MantineTitleSetting
                {...titleProps}
                id={id}
                onPropsUpdate={(id, key, value) =>
                  newPropsUpdate(id, "titleProps", titleProps, key, value)
                }
              />

              <Divider my={"md"} />

              <Title children="Subheading Settings" order={5} />

              <MantineTextSetting
                {...subtitleTextProps}
                id={id}
                onPropsUpdate={(id, key, value) =>
                  newPropsUpdate(
                    id,
                    "subtitleTextProps",
                    subtitleTextProps,
                    key,
                    value
                  )
                }
              />
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
