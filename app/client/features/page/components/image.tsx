import {
  Image,
  ImageProps,
  Stack,
  SegmentedControl,
  Divider,
  NativeSelect,
  Text,
  TextInput,
  Group,
  NumberInput,
  Slider,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";
import { marks } from "../utils/marks";

type MantineImageSettingsProps = ComponentsInfo<
  ImageProps & BaseComponentsInfoProps
>;

export const imageInfo: MantineImageSettingsProps = {
  name: "image",
  group: "display",
  component: Image,
  settingsComponent: MantineImageSetting,
  props: {
    onPropsUpdate: () => {},
    my: 0,
    mb: 0,
    mx: 0,
    src: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png",
    h: "auto",
    w: "auto",
    radius: "md",
    fit: "cover",
    fallbackSrc: "https://placehold.co/600x400?text=Placeholder",
  },
};

export function MantineImageSetting({
  ...props
}: MantineImageSettingsProps["props"]) {
  const { id, c, fallbackSrc, fit, h, my, mx, radius, src, w, onPropsUpdate } =
    props;

  return (
    <Stack mb={35}>
      <TextInput
        label="Image Url"
        description="Specify image url."
        defaultValue={src}
        placeholder="http://www.example.com/placeholder.jpg"
        onChange={(event) =>
          onPropsUpdate(id!, "src", event.currentTarget.value)
        }
      />

      <TextInput
        label="Fallback Image Url"
        description="Specify a fallback image url."
        defaultValue={fallbackSrc}
        placeholder="http://www.example.com/placeholder.jpg"
        onChange={(event) =>
          onPropsUpdate(id!, "fallbackSrc", event.currentTarget.value)
        }
      />

      <Divider />

      <TextInput
        label="Image Width"
        description="Specify image width. Could be number or string value"
        defaultValue={w as string}
        onChange={(event) => onPropsUpdate(id!, "w", event.currentTarget.value)}
      />

      <TextInput
        label="Image Height"
        description="Specify image height. Could be number or string value"
        defaultValue={h as string}
        onChange={(event) => onPropsUpdate(id!, "h", event.currentTarget.value)}
      />

      <Divider />

      <NumberInput
        label="Vertical Spacing"
        defaultValue={Number(my)}
        step={1}
        min={0}
        max={100}
        onChange={(value) => onPropsUpdate(id!, "my", Number(value))}
      />

      <NumberInput
        label="Horizontal Spacing"
        defaultValue={Number(mx)}
        step={1}
        min={0}
        max={40}
        onChange={(value) => onPropsUpdate(id!, "mx", Number(value))}
      />

      <Divider />

      <NativeSelect
        label="Image Fit"
        description='By default the image fit properties has value cover style - it will resize to cover parent element. When the fit properties is set to contain, width value is change to "auto"'
        defaultValue={fit}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (value === "contain") {
            onPropsUpdate(id!, "w", "auto");
          }
          return onPropsUpdate(id!, "fit", value);
        }}
        data={["contain", "cover", "fit"]}
      />
      {/* 
      <NativeSelect
        label="Radius"
        description="Specify the image radius"
        defaultValue={radius}
        onChange={(event) =>
          onPropsUpdate(id!, "radius", event.currentTarget.value)
        }
        data={["xs", "sm", "md", "lg", "xl"]}
      /> */}

      <div>
        <Text size="sm" fw={500}>
          Radius
        </Text>
        <Slider
          defaultValue={marks.find((mark) => mark.label === radius)!.value}
          label={(val) => marks.find((mark) => mark.value === val)!.label}
          step={20}
          marks={marks}
          onChange={(value: number) => {
            onPropsUpdate(
              id!,
              "radius",
              marks.find((mark) => mark.value === value)!.label
            );
          }}
          styles={{ markLabel: { display: "none" } }}
        />
      </div>
    </Stack>
  );
}
