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
  Tooltip,
  Switch,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";

type MantineTextSettingsProps = ComponentsInfo<
  TextProps & BaseComponentsInfoProps
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

export const textInfo: MantineTextSettingsProps = {
  name: "text",
  group: "typography",
  component: Text,
  settingsComponent: MantineTextSetting,
  props: {
    variant: "text",
    c: "#474747",
    gradient: { from: "#0d34de", to: "#37cf15", deg: 60 },
    size: "lg",
    lineClamp: 0,
    truncate: false,
    span: true,
    fw: "400",
    ta: "justify",
    td: "",
    tt: "none",
    children:
      "From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are visible in the upper jaw when its mouth is open. Each of its thick legs ends with three sharp claws. On Bulbasaur's back is a green plant bulb, which is grown from a seed planted there at birth. The bulb also conceals two slender, tentacle-like vines and provides it with energy",
  },
};

export function MantineTextSetting({
  ...props
}: MantineTextSettingsProps["props"]) {
  const { id, c, gradient, lineClamp, size, span, ta, variant } = props;

  const { updateComponent } = useVisualBuilder();

  return (
    <Stack mb={35}>
      <div>
        <Text size="sm" fw={500} mb={3}>
          Text Type
        </Text>
        <SegmentedControl
          defaultValue={variant}
          onChange={(value) => updateComponent(id!, "variant", value)}
          data={[
            { label: "Text", value: "text" },
            { label: "Gradient", value: "gradient" },
          ]}
        />
      </div>

      <Divider my="md" />

      <div>
        <Text size="sm" fw={500} mb={3}>
          Text Alignment
        </Text>
        <SegmentedControl
          defaultValue={ta as string}
          onChange={(value) => updateComponent(id!, "ta", value)}
          data={[
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Justify", value: "justify" },
          ]}
        />
      </div>

      <ColorInput
        defaultValue={c as string}
        onChange={(value) => updateComponent(id!, "c", value)}
        label="Text color"
        description="Pick a text color, Click the picker icon on the right to pick from anywhere in the screen"
      />

      <div>
        <Text size="sm" fw={500} mb={1}>
          Gradient From
        </Text>

        <ColorPicker
          defaultValue={gradient?.from}
          onChange={(value) =>
            updateComponent(id!, "gradient", {
              from: value,
              to: gradient?.to,
              deg: gradient?.deg,
            })
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
          defaultValue={gradient?.to}
          onChange={(value) =>
            updateComponent(id!, "gradient", {
              from: gradient?.from,
              to: value,
              deg: gradient?.deg,
            })
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
          defaultValue={gradient?.deg}
          onChange={(value) =>
            updateComponent(id!, "gradient", {
              from: gradient?.from,
              to: gradient?.to,
              deg: value,
            })
          }
          min={0}
          max={360}
          step={10}
        />
      </div>

      <Divider my="md" />

      <NativeSelect
        label="Size"
        description="Specify the text size"
        defaultValue={size}
        onChange={(event) =>
          updateComponent(id!, "size", event.currentTarget.value)
        }
        data={["xs", "sm", "md", "lg", "xl"]}
      />

      <NativeSelect
        label="Line Clamp"
        description="Specify the number of lines after which Text will be truncated"
        defaultValue={lineClamp}
        onChange={(event) =>
          updateComponent(id!, "lineClamp", Number(event.currentTarget.value))
        }
        data={["none", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
      />

      <Divider my="md" />

      {/*  label="span"
        description="" */}
      <div>
        <Text size="sm" fw={500} mb={3}>
          Span?
        </Text>
        <SegmentedControl
          defaultValue={span ? "true" : "false"}
          onChange={(value) => updateComponent(id!, "span", value === "true")}
          data={[
            { label: "Span", value: "true" },
            { label: "Paragraph", value: "false" },
          ]}
        />
      </div>
    </Stack>
  );
}
