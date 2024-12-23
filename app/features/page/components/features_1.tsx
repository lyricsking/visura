import {
  Text,
  Divider,
  TextInput,
  NativeSelect,
  Slider,
  Image,
  ImageProps,
  Box,
  NumberInput,
  BoxProps,
  Title,
  TitleProps,
  HighlightProps,
  Grid,
  Accordion,
  Textarea,
  ColorInput,
  SegmentedControl,
  MantineSpacing,
  StyleProp,
  Stack,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { marks } from "../utils/marks";
import { RichTextEditor } from "./rich-text-editor";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type ItemProps = BoxProps & {
  featureProps: TitleProps;
  headlineProps: TitleProps;
  subtitleProps: HighlightProps;
};

type FeatureProps = {
  mt: StyleProp<MantineSpacing>;
  mb: StyleProp<MantineSpacing>;
  mx: StyleProp<MantineSpacing>;
  order: "ltr" | "rtl";
  imageProps: ImageProps;
  itemProps: ItemProps;
};

type FeatureSectionSettingsProps = ComponentsInfo<
  BaseComponentsInfoProps & FeatureProps
>;

export const featureSectionInfo: FeatureSectionSettingsProps = {
  name: "feature",
  group: "sections",
  component: FeatureSection,
  settingsComponent: FeatureSectionSettings,
  props: {
    onPropsUpdate: () => {},
    mt: 0,
    mb: 0,
    mx: 0,
    order: "ltr",
    imageProps: {
      my: 0,
      mb: 0,
      mx: 0,
      src: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
      h: "200",
      w: "200",
      radius: "0",
      fit: "cover",
      fallbackSrc: "https://placehold.co/600x400?text=Placeholder",
    },
    itemProps: {
      featureProps: { order: 3, size: "h6", children: "Feature Name" },
      headlineProps: {
        order: 4,
        size: "h3",
        children: "Headline text",
        lineClamp: 2,
      },
      subtitleProps: {
        children: "Subtitle text",
        highlight: "",
      },
    },
  },
};

export function FeatureSection({
  mt,
  mb,
  mx,
  order,
  imageProps,
  itemProps,
}: FeatureProps) {
  let mOrder = 0;
  if (order === "rtl") {
    mOrder = 1;
  }

  return (
    <Grid
      overflow="hidden"
      mt={mt}
      mb={mb}
      mx={mx}
      gutter={{ base: "sm", md: "xl" }}
    >
      <Grid.Col span={6} order={mOrder}>
        <Image {...imageProps} />
      </Grid.Col>
      <Grid.Col span={6}>
        <FeatureItem {...itemProps} />
      </Grid.Col>
    </Grid>
  );
}

export function FeatureSectionSettings({
  id,
  imageProps,
  itemProps,
  order,
  mt,
  mb,
  mx,
  onPropsUpdate,
}: FeatureSectionSettingsProps["props"]) {
  const { featureProps, headlineProps, subtitleProps } = itemProps;

  return (
    <Accordion variant="contained" defaultValue={"layout"}>
      <Accordion.Item value={"layout"}>
        <Accordion.Control>Layout Setting</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            {/* Layout order euther ltr or rtl */}
            <NativeSelect
              label="Layout Order"
              description="Specify the layout order, either left-to-right (ltr) or right-to-left (rtl)."
              defaultValue={order}
              onChange={(event) => {
                const value = event.currentTarget.value;

                return onPropsUpdate(id!, "order", value);
              }}
              data={[
                { label: "Left to right", value: "ltr" },
                { label: "Right to left", value: "rtl" },
              ]}
            />

            <NumberInput
              label="Top Spacing"
              defaultValue={Number(mt)}
              step={1}
              min={0}
              max={100}
              onChange={(value) => onPropsUpdate(id!, "mt", value)}
            />

            <NumberInput
              label="Horizontal Spacing"
              defaultValue={Number(mx)}
              step={1}
              min={0}
              max={100}
              onChange={(value) => onPropsUpdate(id!, "mx", value)}
            />

            <NumberInput
              label="Bottom Spacing"
              defaultValue={Number(mb)}
              step={1}
              min={0}
              max={100}
              onChange={(value) => onPropsUpdate(id!, "mb", value)}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={"image"}>
        <Accordion.Control>Image Setting</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <TextInput
              label="Image Url"
              description="Specify image url."
              defaultValue={imageProps.src}
              placeholder="http://www.example.com/placeholder.jpg"
              onChange={(event) =>
                onPropsUpdate(id!, "imageProps", {
                  ...imageProps,
                  src: event.currentTarget.value,
                })
              }
            />

            <TextInput
              label="Fallback Image Url"
              description="Specify a fallback image url."
              defaultValue={imageProps.fallbackSrc}
              placeholder="http://www.example.com/placeholder.jpg"
              onChange={(event) =>
                onPropsUpdate(id!, "imageProps", {
                  ...imageProps,
                  fallbackSrc: event.currentTarget.value,
                })
              }
            />

            <Divider />

            <TextInput
              label="Image Width"
              description="Specify image width. Could be number or string value"
              defaultValue={imageProps.w as string}
              onChange={(event) =>
                onPropsUpdate(id!, "imageProps", {
                  ...imageProps,
                  w: event.currentTarget.value,
                })
              }
            />

            <TextInput
              label="Image Height"
              description="Specify image height. Could be number or string value"
              defaultValue={imageProps.h as string}
              onChange={(event) =>
                onPropsUpdate(id!, "imageProps", {
                  ...imageProps,
                  h: event.currentTarget.value,
                })
              }
            />

            <Divider />

            <NumberInput
              label="Vertical Spacing"
              defaultValue={Number(imageProps.my)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "imageProps", { ...imageProps, my: value })
              }
            />

            <NumberInput
              label="Horizontal Spacing"
              defaultValue={Number(imageProps.mx)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "imageProps", { ...imageProps, mx: value })
              }
            />

            <Divider />

            <NativeSelect
              label="Image Fit"
              description='By default the image fit properties has value cover style - it will resize to cover parent element. When the fit properties is set to contain, width value is change to "auto"'
              defaultValue={imageProps.fit}
              onChange={(event) => {
                const newProps = { ...imageProps };

                const value = event.currentTarget.value;
                newProps["fit"] = value as any;

                if (value === "contain") {
                  newProps["w"] = "auto";
                }

                return onPropsUpdate(id!, "imageProps", newProps);
              }}
              data={["contain", "cover", "fit"]}
            />

            <div>
              <Text size="sm" fw={500}>
                Radius
              </Text>
              <Slider
                defaultValue={
                  marks.find((mark) => mark.label === imageProps.radius)!.value
                }
                label={(val) => marks.find((mark) => mark.value === val)!.label}
                step={20}
                marks={marks}
                onChange={(value: number) => {
                  onPropsUpdate(id!, "imageProps", {
                    ...imageProps,
                    radius: marks.find((mark) => mark.value === value)!.label,
                  });
                }}
                styles={{ markLabel: { display: "none" } }}
              />
            </div>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={"feature"}>
        <Accordion.Control>Feature Name Setting</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <NativeSelect
              label="Title type"
              description="Specify the text size"
              defaultValue={featureProps.size}
              onChange={(event: any) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  featureProps: {
                    ...featureProps,
                    size: event.currentTarget.value,
                  },
                })
              }
              data={[
                { label: "H1", value: "h1" },
                { label: "H2", value: "h2" },
                { label: "H3", value: "h3" },
                { label: "H4", value: "h4" },
                { label: "H5", value: "h5" },
                { label: "H6", value: "h6" },
              ]}
            />

            <Divider />

            <Textarea
              label="Title text"
              description="Enter title text below"
              placeholder="Title"
              defaultValue={String(featureProps.children)}
              onChange={(event) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  featureProps: {
                    ...featureProps,
                    children: event.currentTarget.value,
                  },
                })
              }
            />

            <Divider />

            <div>
              <Text size="sm" fw={500} mb={3}>
                Text Alignment
              </Text>
              <SegmentedControl
                defaultValue={featureProps.ta as string}
                onChange={(value: any) =>
                  onPropsUpdate(id!, "itemProps", {
                    ...itemProps,
                    featureProps: {
                      ...featureProps,
                      ta: value,
                    },
                  })
                }
                size="xs"
                data={[
                  { label: "Start", value: "start" },
                  { label: "Center", value: "center" },
                  { label: "End", value: "end" },
                  { label: "Justify", value: "justify" },
                ]}
              />
            </div>

            <ColorInput
              defaultValue={featureProps.c as string}
              onChange={(value: any) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  featureProps: {
                    ...featureProps,
                    c: value,
                  },
                })
              }
              label="Text color"
              description="Pick a text color, Click the picker icon on the right to pick from anywhere in the screen"
            />

            <Divider />

            <NumberInput
              label="Top Spacing"
              defaultValue={Number(featureProps.mt)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  featureProps: {
                    ...featureProps,
                    mt: value,
                  },
                })
              }
            />

            <NumberInput
              label="Horizontal Spacing"
              defaultValue={Number(featureProps.mx)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  featureProps: {
                    ...featureProps,
                    mx: value,
                  },
                })
              }
            />

            <NumberInput
              label="Bottom Spacing"
              defaultValue={Number(featureProps.mb)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  featureProps: {
                    ...featureProps,
                    mb: value,
                  },
                })
              }
            />

            <Divider />

            <NativeSelect
              label="Line Clamp"
              description="Specify the number of lines after which Text will be truncated"
              defaultValue={featureProps.lineClamp}
              onChange={(event: any) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  featureProps: {
                    ...featureProps,
                    lineClamp: Number(event.currentTarget.value),
                  },
                })
              }
              data={["none", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={"title"}>
        <Accordion.Control>Headline Setting</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <NativeSelect
              label="Title type"
              description="Specify the text size"
              defaultValue={headlineProps.size}
              onChange={(event: any) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  headlineProps: {
                    ...headlineProps,
                    size: event.currentTarget.value,
                  },
                })
              }
              data={[
                { label: "H1", value: "h1" },
                { label: "H2", value: "h2" },
                { label: "H3", value: "h3" },
                { label: "H4", value: "h4" },
                { label: "H5", value: "h5" },
                { label: "H6", value: "h6" },
              ]}
            />

            <Divider />

            <Textarea
              label="Title text"
              description="Enter title text below"
              placeholder="Title"
              defaultValue={String(headlineProps.children)}
              onChange={(event) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  headlineProps: {
                    ...headlineProps,
                    children: event.currentTarget.value,
                  },
                })
              }
            />

            <Divider />

            <div>
              <Text size="sm" fw={500} mb={3}>
                Text Alignment
              </Text>
              <SegmentedControl
                defaultValue={headlineProps.ta as string}
                onChange={(value: any) =>
                  onPropsUpdate(id!, "itemProps", {
                    ...itemProps,
                    headlineProps: {
                      ...headlineProps,
                      ta: value,
                    },
                  })
                }
                size="xs"
                data={[
                  { label: "Start", value: "start" },
                  { label: "Center", value: "center" },
                  { label: "End", value: "end" },
                  { label: "Justify", value: "justify" },
                ]}
              />
            </div>

            <ColorInput
              defaultValue={headlineProps.c as string}
              onChange={(value: any) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  headlineProps: {
                    ...headlineProps,
                    c: value,
                  },
                })
              }
              label="Text color"
              description="Pick a text color, Click the picker icon on the right to pick from anywhere in the screen"
            />

            <Divider />

            <NumberInput
              label="Top Spacing"
              defaultValue={Number(headlineProps.mt)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  headlineProps: {
                    ...headlineProps,
                    mt: value,
                  },
                })
              }
            />

            <NumberInput
              label="Horizontal Spacing"
              defaultValue={Number(headlineProps.mx)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  headlineProps: {
                    ...headlineProps,
                    mx: value,
                  },
                })
              }
            />

            <NumberInput
              label="Bottom Spacing"
              defaultValue={Number(headlineProps.mb)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  headlineProps: {
                    ...headlineProps,
                    mb: value,
                  },
                })
              }
            />

            <Divider />

            <NativeSelect
              label="Line Clamp"
              description="Specify the number of lines after which Text will be truncated"
              defaultValue={headlineProps.lineClamp}
              onChange={(event: any) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  headlineProps: {
                    ...headlineProps,
                    lineClamp: Number(event.currentTarget.value),
                  },
                })
              }
              data={["none", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={"subtitle"}>
        <Accordion.Control>Subtitle Setting</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <RichTextEditor
              // label="Text"
              // description="Enter text below"
              // placeholder="Enter text here"
              // defaultValue={String(subtitleProps.children)}
              value={String(subtitleProps.children)}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  subtitleProps: {
                    ...subtitleProps,
                    children: value,
                  },
                })
              }
            />

            <Divider />

            <div>
              <Text size="sm" fw={500} mb={3}>
                Text Alignment
              </Text>
              <SegmentedControl
                defaultValue={subtitleProps.ta as string}
                size="xs"
                onChange={(value: any) =>
                  onPropsUpdate(id!, "itemProps", {
                    ...itemProps,
                    subtitleProps: {
                      ...subtitleProps,
                      ta: value,
                    },
                  })
                }
                data={[
                  { label: "Start", value: "start" },
                  { label: "Center", value: "center" },
                  { label: "End", value: "end" },
                  { label: "Justify", value: "justify" },
                ]}
              />
            </div>

            <Divider />

            <NumberInput
              label="Top Spacing"
              defaultValue={Number(subtitleProps.mt)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  subtitleProps: {
                    ...subtitleProps,
                    mt: value,
                  },
                })
              }
            />

            <NumberInput
              label="Horizontal Spacing"
              defaultValue={Number(subtitleProps.mx)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  subtitleProps: {
                    ...subtitleProps,
                    mx: value,
                  },
                })
              }
            />

            <NumberInput
              label="Bottom Spacing"
              defaultValue={Number(subtitleProps.mb)}
              step={1}
              min={0}
              max={100}
              onChange={(value) =>
                onPropsUpdate(id!, "itemProps", {
                  ...itemProps,
                  subtitleProps: {
                    ...subtitleProps,
                    mb: value,
                  },
                })
              }
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function FeatureItem({
  featureProps,
  headlineProps,
  subtitleProps: { children, ...subtitleProps },
  ...boxAttrs
}: ItemProps) {
  return (
    <Box {...boxAttrs}>
      <Title {...featureProps} />
      <Title {...headlineProps} />
      <Box
        {...subtitleProps}
        className="min-h-44 min-w-full prose md:prose-lg lg:prose-xl rounded-md bg-white"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {children}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
