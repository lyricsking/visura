import {
  Text,
  Stack,
  SegmentedControl,
  Divider,
  DividerProps,
  TextInput,
  NativeSelect,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";

type DividerSettingsProps = ComponentsInfo<
  DividerProps & BaseComponentsInfoProps
>;

export const dividerInfo: DividerSettingsProps = {
  name: "divider",
  group: "misc",
  component: Divider,
  settingsComponent: DividerSetting,
  props: {
    onPropsUpdate: () => {},
    variant: "solid",
    label: "",
    labelPosition: "left",
    size: "sm",
    my: "xs",
    mx: "0",
    orientation: "horizontal",
  },
};

export function DividerSetting({ ...props }: DividerSettingsProps["props"]) {
  const {
    id,
    label,
    labelPosition,
    orientation,
    size,
    variant,
    onPropsUpdate,
  } = props;

  return (
    <Stack mb={35}>
      <div>
        <Text size="sm" fw={500} mb={3}>
          Orientation
        </Text>
        <SegmentedControl
          defaultValue={orientation}
          onChange={(value: string) => onPropsUpdate(id!, "orientation", value)}
          data={[
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ]}
        />
      </div>

      <div>
        <Text size="sm" fw={500} mb={3}>
          Divider Type
        </Text>
        <SegmentedControl
          defaultValue={variant}
          onChange={(value: string) => onPropsUpdate(id!, "variant", value)}
          data={[
            { label: "Solid", value: "solid" },
            { label: "Dashed", value: "dashed" },
            { label: "Dotted", value: "dotted" },
          ]}
        />
      </div>

      <TextInput
        label="Label"
        description="Specify an optional label for the divider."
        defaultValue={typeof label === "string" ? label : undefined}
        onChange={(event) =>
          onPropsUpdate(id!, "label", event.currentTarget.value)
        }
      />

      <div>
        <Text id="label-position-description" size="sm" fw={500} mb={3}>
          Label Position
        </Text>
        <SegmentedControl
          aria-describedby="label-position-description"
          defaultValue={labelPosition}
          onChange={(value: string) =>
            onPropsUpdate(id!, "labelPosition", value)
          }
          data={[
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ]}
        />
      </div>

      <NativeSelect
        label="Size"
        description="Specify the divider size"
        defaultValue={size}
        onChange={(event: any) =>
          onPropsUpdate(id!, "size", event.currentTarget.value)
        }
        data={["xs", "sm", "md", "lg", "xl"]}
      />
    </Stack>
  );
}
