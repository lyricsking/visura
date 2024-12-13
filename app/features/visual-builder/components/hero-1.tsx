import {
  Button,
  ColorInput,
  Container,
  ContainerProps,
  Divider,
  Flex,
  MantineColor,
  Stack,
  StyleProp,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import {
  BaseComponentsInfoProps,
  ComponentsInfo,
} from "../types/builder.components";
import { MantineTextSetting, MantineTextSettingsProps, textInfo } from "./text";
import {
  MantineTitleSetting,
  MantineTitleSettingsProps,
  titleInfo,
} from "./title";
import { buttonInfo, ButtonSetting, ButtonSettingsProps } from "./button";

type HighlightProps = {
  /** Color */
  c?: StyleProp<MantineColor>;
};

type Hero1SettingsProps = ComponentsInfo<
  BaseComponentsInfoProps &
    ContainerProps & {
      titleProps: MantineTitleSettingsProps["props"];
      highlightProps: HighlightProps;
      highlightText?: string;
      trailingText?: string;
      heroTextProps: MantineTextSettingsProps["props"];
      buttonLeftProps: ButtonSettingsProps["props"];
      buttonRightProps: ButtonSettingsProps["props"];
    }
>;

export const hero1Info: Hero1SettingsProps = {
  name: "hero 1",
  group: "sections",
  component: Hero,
  settingsComponent: HeroSettings,
  props: {
    titleProps: { ...titleInfo["props"], mt: 55, mb: 20, mx: 35, order: 2 },
    highlightProps: {
      c: "#228be6",
    },
    highlightText: "with highlighted text",
    trailingText: "and a trailing text",
    heroTextProps: {
      ...textInfo["props"],
      c: "#474747",
      ta: "center",
      size: "lg",
    },
    buttonLeftProps: {
      ...buttonInfo["props"],
      children: "Left Button",
      variant: "outline",
      onPropsUpdate: () => {},
    },
    buttonRightProps: {
      ...buttonInfo["props"],
      children: "Right Button",
      onPropsUpdate: () => {},
    },
    onPropsUpdate: () => {},
  },
};

export function Hero(props: Hero1SettingsProps["props"]) {
  const {
    buttonLeftProps,
    buttonRightProps,
    my,
    mx,
    trailingText,
    heroTextProps,
    highlightText,
    highlightProps,
    titleProps,
  } = props;
  const { children } = titleProps;

  return (
    <Container fluid my={my} mx={mx}>
      <div>
        <Title {...titleProps}>
          {children}{" "}
          {highlightText && (
            <Text {...highlightProps} component="span" inherit>
              {highlightText}{" "}
            </Text>
          )}
          {trailingText || null}
        </Title>

        <Container p={0} size={600}>
          <Text {...heroTextProps} />
        </Container>

        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "center" }}
          my={10}
        >
          {buttonLeftProps && <Button {...buttonLeftProps} />}
          {buttonRightProps && <Button {...buttonRightProps} />}
        </Flex>
      </div>
    </Container>
  );
}

export function HeroSettings(props: Hero1SettingsProps["props"]) {
  const {
    id,
    buttonLeftProps,
    buttonRightProps,
    my,
    mx,
    titleProps,
    heroTextProps,
    highlightProps,
    highlightText,
    trailingText,
    onPropsUpdate,
  } = props;

  const { c } = highlightProps;

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
    <Stack>
      <MantineTitleSetting
        {...titleProps}
        id={id}
        onPropsUpdate={(id, key, value) =>
          newPropsUpdate(id, "titleProps", titleProps, key, value)
        }
      />

      <Textarea
        label="Highlight text"
        description="Enter an optional highlighted text"
        placeholder="Highlight"
        defaultValue={String(highlightText)}
        onChange={(event) =>
          onPropsUpdate(id!, "highlightText", event.currentTarget.value)
        }
      />

      <ColorInput
        defaultValue={c as string}
        onChange={(value: any) =>
          newPropsUpdate(id!, "highlightProps", highlightProps, "c", value)
        }
        label="Highlight color"
        description="Pick a text color, Click the picker icon on the right to pick from anywhere in the screen"
      />

      <Textarea
        label="Trailing text"
        description="Enter an optional trailing text to appear after highlighted text"
        placeholder="Trailing"
        defaultValue={String(trailingText)}
        onChange={(event) =>
          onPropsUpdate(id!, "trailingText", event.currentTarget.value)
        }
      />

      <Divider />

      <MantineTextSetting
        {...heroTextProps}
        id={id}
        onPropsUpdate={(id, key, value) =>
          newPropsUpdate(id, "heroTextProps", heroTextProps, key, value)
        }
      />

      <Divider />

      <ButtonSetting
        {...buttonLeftProps}
        id={id}
        onPropsUpdate={(id, key, value) =>
          newPropsUpdate(id, "buttonLeftProps", buttonLeftProps, key, value)
        }
      />

      <ButtonSetting
        {...buttonRightProps}
        id={id}
        onPropsUpdate={(id, key, value) =>
          newPropsUpdate(id, "buttonRightProps", buttonRightProps, key, value)
        }
      />
    </Stack>
  );
}
