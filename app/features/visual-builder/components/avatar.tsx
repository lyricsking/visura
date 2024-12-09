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
  AvatarProps,
  TextInput,
  Avatar,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";

type MantineAvatarSettingsProps = ComponentsInfo<
  AvatarProps & BaseComponentsInfoProps
>;

const colorSwatch = [
  "#2e2e2e",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
];

export const avatarInfo: MantineAvatarSettingsProps = {
  name: "avatar",
  group: "data",
  component: Avatar,
  settingsComponent: MantineAvatarSettings,
  props: {
    name: undefined,
    color: "initials",
    src: undefined,
    alt: "Avatar alt text",
    radius: "md",
    variant: "",
  },
};

export function MantineAvatarSettings({
  ...props
}: MantineAvatarSettingsProps["props"]) {
  const { id, name, color, src, alt, radius, variant } = props;

  const { updateComponent } = useVisualBuilder();

  return (
    <Stack mb={35}>
      <TextInput
        label="Avatar Image Url"
        description="Specify image url."
        defaultValue={src ?? undefined}
        placeholder="http://www.example.com/placeholder.jpg"
        onChange={(event) =>
          updateComponent(id!, "src", event.currentTarget.value)
        }
      />

      <TextInput
        label="Avatar Image Alt"
        description="Specify avatar image alt text."
        defaultValue={alt}
        placeholder="Image Alt"
        onChange={(event) =>
          updateComponent(id!, "alt", event.currentTarget.value)
        }
      />

      <Divider my="md" />

      <TextInput
        label="Optional Avatar Name"
        description="Specify this if you want to display user initials"
        defaultValue={name as string}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (value) {
            updateComponent(id!, "color", "initials");
          }
          return updateComponent(id!, "name", value);
        }}
      />

      <Divider my="md" />
      <NativeSelect
        label="Avatar Type"
        description="Specify avatar variant."
        defaultValue={variant}
        onChange={(event) =>
          updateComponent(id!, "variant", event.currentTarget.value)
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
        defaultValue={radius}
        onChange={(event) =>
          updateComponent(id!, "radius", event.currentTarget.value)
        }
        data={["xs", "sm", "md", "lg", "xl"]}
      />
    </Stack>
  );
}
