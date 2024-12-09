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
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";

type MantineImageSettingsProps = ComponentsInfo<
  ImageProps & BaseComponentsInfoProps
>;

export const imageInfo: MantineImageSettingsProps = {
  name: "image",
  group: "data",
  component: Image,
  settingsComponent: MantineImageSetting,
  props: {
    src: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png",
    h: "200",
    w: "auto",
    radius: "md",
    fit: "cover",
    fallbackSrc: "https://placehold.co/600x400?text=Placeholder",
  },
};

export function MantineImageSetting({
  ...props
}: MantineImageSettingsProps["props"]) {
  const { id, c, fallbackSrc, fit, h, radius, src, w } = props;

  const { updateComponent } = useVisualBuilder();

  return (
    <Stack mb={35}>
      <TextInput
        label="Image Url"
        description="Specify image url."
        defaultValue={src}
        placeholder="http://www.example.com/placeholder.jpg"
        onChange={(value) => updateComponent(id!, "src", value)}
      />

      <TextInput
        label="Fallback Image Url"
        description="Specify a fallback image url."
        defaultValue={fallbackSrc}
        placeholder="http://www.example.com/placeholder.jpg"
        onChange={(event) =>
          updateComponent(id!, "fallbackSrc", event.currentTarget.value)
        }
      />

      <Divider my="md" />

      <TextInput
        label="Image Width"
        description="Specify image width. Could be number or string value"
        defaultValue={w as string}
        onChange={(event) =>
          updateComponent(id!, "w", event.currentTarget.value)
        }
      />

      <TextInput
        label="Image Height"
        description="Specify image height. Could be number or string value"
        defaultValue={h as string}
        onChange={(event) =>
          updateComponent(id!, "h", event.currentTarget.value)
        }
      />

      <Divider my="md" />

      <NativeSelect
        label="Image Fit"
        description='By default the image fit properties has value cover style - it will resize to cover parent element. When the fit properties is set to contain, width value is change to "auto"'
        defaultValue={fit}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (value === "contain") {
            updateComponent(id!, "w", "auto");
          }
          return updateComponent(id!, "fit", value);
        }}
        data={["contain", "cover", "fit"]}
      />

      <NativeSelect
        label="Radius"
        description="Specify the image radius"
        defaultValue={radius}
        onChange={(event) =>
          updateComponent(id!, "radius", event.currentTarget.value)
        }
        data={["xs", "sm", "md", "lg", "xl"]}
      />
    </Stack>
  );
}
