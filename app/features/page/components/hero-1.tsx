import {
  Accordion,
  BackgroundImage,
  Box,
  BoxProps,
  Button,
  ColorInput,
  ColorPicker,
  Container,
  ContainerProps,
  CSSProperties,
  Divider,
  Flex,
  MantineColor,
  MantineStyleProp,
  NumberInput,
  Overlay,
  Slider,
  Stack,
  StyleProp,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import {
  BaseComponentsInfoProps,
  ComponentsInfo,
} from "../types/builder.components";
import { buttonInfo, ButtonSetting, ButtonSettingsProps } from "./button";
import { textInfo, TextSetting, TextSettingsProps } from "./text";
import { titleInfo, TitleSetting, TitleSettingsProps } from "./title";
import BorderInput from "./border";
import { marks } from "../utils/marks";
import { colorSwatch } from "../utils/color";

type HighlightProps = {
  /** Color */
  c?: StyleProp<MantineColor>;
};

type Hero1SettingsProps = ComponentsInfo<
  BaseComponentsInfoProps &
    BoxProps & {
      bgImageSrc?: string;
      bgColor?: string;
      bgColorOpacity: number;
      blur: number;
      titleProps: TitleSettingsProps["props"];
      highlightProps: HighlightProps;
      highlightText?: string;
      trailingText?: string;
      subtitleTextProps: TextSettingsProps["props"];
      buttonLeftProps: ButtonSettingsProps["props"];
      buttonRightProps: ButtonSettingsProps["props"];
    }
>;

export const hero1Info: Hero1SettingsProps = {
  name: "Hero (Basic)",
  group: "sections",
  component: Hero,
  settingsComponent: HeroSettings,
  props: {
    bgColorOpacity: 0,
    blur: 0,
    style: {
      borderTop: "0px none #000000",
      borderRight: "0px none #000000",
      borderBottom: "0px none #000000",
      borderLeft: "0px none #000000",
      borderRadius: "0px",
    },
    titleProps: { ...titleInfo["props"], mt: 55, mb: 20, mx: 35, order: 2 },
    highlightProps: {
      c: "#228be6",
    },
    highlightText: "with highlighted text",
    trailingText: "and a trailing text",
    subtitleTextProps: {
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
    bgImageSrc,
    bgColor,
    bgColorOpacity,
    blur,
    buttonLeftProps,
    buttonRightProps,
    pb,
    pt,
    px,
    style,
    trailingText,
    subtitleTextProps,
    highlightText,
    highlightProps,
    titleProps,
  } = props;
  const { children, ...titleAttrs } = titleProps;
  
  let content =
    <>
  <Title {...titleAttrs}>
        {children}{" "}
        {highlightText && (
          <Text {...highlightProps} component="span" inherit>
            {highlightText}{" "}
          </Text>
        )}
        {trailingText || null}
      </Title>

      <Container p={0} size={600}>
        <Text {...subtitleTextProps} />
      </Container>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        my={10}
      >
        {buttonLeftProps && !buttonLeftProps.hidden && (
          <Button {...buttonLeftProps} />
        )}
        {buttonRightProps && !buttonRightProps.hidden && (
          <Button {...buttonRightProps} />
        )}
      </Flex>
    </>
  
  //if (bgColor) {
  //  content = (
  //    <Overlay color={bgColor} backgroundOpacity={bgColorOpacity} blur={blur}>
  //      {content}
  //    </Overlay>
  //  );
  //}

  //if (bgImageSrc) {
  //  content = <BackgroundImage src={bgImageSrc}>{content}</BackgroundImage>;
  //}

  
   return( <Box pb={pb} pt={pt} px={px} style={style}>
      { content}
    </Box>
  );
}

export function HeroSettings(props: Hero1SettingsProps["props"]) {
  const {
    id,
  bgColor,bgColorOpacity,bgImageSrc,blur,  buttonLeftProps,
    buttonRightProps,
    pt,
    pb,
    px,
    style,
    titleProps,
    subtitleTextProps,
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
    <Accordion variant="contained">
      <Accordion.Item value="layout">
        <Accordion.Control>Layout Setting</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            {/** BackgroundImage src */}
            <TextInput
              label="Background Image Src"
              description="Optionally specify the background image url"
              type="text"
              defaultValue={bgImageSrc}
              onChange={(event) =>
                onPropsUpdate(id!, "bgImageSrc", event.currentTarget.value)
              }
            />

            {/** Background color picker */}
            <div>
              <Text size="sm" fw={500}>
                Background Color
              </Text>

              <ColorPicker
                defaultValue={bgColor}
                onChange={(value: any) => {
                  onPropsUpdate(id!, "bgColor", value);
                }}
                format="hex"
                fullWidth
                swatches={colorSwatch}
              />
            </div>

            {/** Background Opacity, must be between 0 and 1 */}
            <NumberInput
              label="BackgroundOpacity"
              description="Specify the degree of transparency of the background color. Should be vetween 0 and 1"
              defaultValue={Number(bgColorOpacity)}
              step={0.1}
              min={0}
              max={1}
              onChange={(value) => onPropsUpdate(id!, "bgColorOpacity", value)}
            />

            {/** Background blur property, must be between 0 and 30 */}
            <NumberInput
              label="Blur"
              description="Specify the degree of blur of the background color. Should be between 0 and 30"
              defaultValue={Number(blur)}
              step={0.1}
              min={0}
              max={1}
              onChange={(value) => onPropsUpdate(id!, "blur", value)}
            />

            <Divider />

            <NumberInput
              label="Top Spacing"
              defaultValue={Number(pt) || 0}
              step={1}
              min={0}
              max={100}
              onChange={(value) => onPropsUpdate(id!, "pt", value)}
            />

            <NumberInput
              label="Horizontal Spacing"
              defaultValue={Number(px) || 0}
              step={1}
              min={0}
              max={100}
              onChange={(value) => onPropsUpdate(id!, "px", value)}
            />

            <NumberInput
              label="Bottom Spacing"
              defaultValue={Number(pb) || 0}
              step={1}
              min={0}
              max={100}
              onChange={(value) => onPropsUpdate(id!, "pb", value)}
            />

            <BorderInput
              styles={style}
              onChange={(borderStyles) =>
                onPropsUpdate(id!, "style", {
                  ...style,
                  ...borderStyles,
                })
              }
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value={"title"}>
        <Accordion.Control>Title Section</Accordion.Control>
        <Accordion.Panel>
          <TitleSetting
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
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={"subtitle"}>
        <Accordion.Control>Subtitle Section</Accordion.Control>
        <Accordion.Panel>
          <TextSetting
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
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={"buttons"}>
        <Accordion.Control>Buttons Section</Accordion.Control>
        <Accordion.Panel>
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
              newPropsUpdate(
                id,
                "buttonRightProps",
                buttonRightProps,
                key,
                value
              )
            }
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
