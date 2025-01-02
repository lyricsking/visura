import {
  Text,
  Stack,
  Divider,
  Slider,
  NativeSelect,
  AvatarProps,
  TextInput,
  Avatar,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../../../../core/types/builder.components";

type MantineAvatarSettingsProps = ComponentsInfo<
  AvatarProps & BaseComponentsInfoProps
>;

export const avatarInfo: MantineAvatarSettingsProps = {
  name: "avatar",
  group: "display",
  component: Avatar,
  settingsComponent: MantineAvatarSettings,
  props: {
    onPropsUpdate: () => {},
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
  const { id, name, color, src, alt, my, mx, radius, variant, onPropsUpdate } =
    props;

  return (
    <Stack mb={35}>
      <TextInput
        label="Avatar Image Url"
        description="Specify image url."
        defaultValue={src ?? undefined}
        placeholder="http://www.example.com/placeholder.jpg"
        onChange={(event) =>
          onPropsUpdate(id!, "src", event.currentTarget.value)
        }
      />

      <TextInput
        label="Avatar Image Alt"
        description="Specify avatar image alt text."
        defaultValue={alt}
        placeholder="Image Alt"
        onChange={(event) =>
          onPropsUpdate(id!, "alt", event.currentTarget.value)
        }
      />

      <Divider />

      <TextInput
        label="Optional Avatar Name"
        description="Specify this if you want to display user initials"
        defaultValue={name as string}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (value) {
            onPropsUpdate(id!, "color", "initials");
          }
          return onPropsUpdate(id!, "name", value);
        }}
      />

      <Divider />

      <NativeSelect
        label="Avatar Type"
        description="Specify avatar variant."
        defaultValue={variant}
        onChange={(event) =>
          onPropsUpdate(id!, "variant", event.currentTarget.value)
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
        defaultValue={radius}
        onChange={(event) =>
          onPropsUpdate(id!, "radius", event.currentTarget.value)
        }
        data={["xs", "sm", "md", "lg", "xl"]}
      />
    </Stack>
  );
}
