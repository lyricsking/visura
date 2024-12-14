import {
  Stack,
  SegmentedControl,
  Divider,
  ColorInput,
  ColorPicker,
  Slider,
  NativeSelect,
  HighlightProps,
  Text,
  Highlight,
  Textarea,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { colorSwatch } from "../utils/color";

export type MantineTextSettingsProps = ComponentsInfo<
  BaseComponentsInfoProps & HighlightProps
>;

export const textInfo: MantineTextSettingsProps = {
  name: "text",
  group: "display",
  component: Highlight,
  settingsComponent: MantineTextSetting,
  props: {
    variant: "text",
    highlight: "",
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
    children: "Enter text",
    onPropsUpdate: () => {},
  },
};

export function MantineTextSetting(props: MantineTextSettingsProps["props"]) {
  const {
    id,
    color,
    children,
    gradient,
    lineClamp,
    mt,
    mb,
    mx,
    span,
    size,
    ta,
    variant,
    onPropsUpdate,
  } = props;

  return (
    <Stack mb={35}>
      {/*  label="span"
        description="" */}

      <Textarea
        label="Text"
        description="Enter text below"
        placeholder="Enter text here"
        defaultValue={String(children)}
        onChange={(event) =>
          onPropsUpdate(id!, "children", event.currentTarget.value)
        }
      />

      <div>
        <Text size="sm" fw={500} mb={3}>
          Span
        </Text>
        <SegmentedControl
          defaultValue={span ? "true" : "false"}
          size="xs"
          onChange={(value: any) =>
            onPropsUpdate(id!, "span", value === "true")
          }
          data={[
            { label: "Span", value: "true" },
            { label: "Paragraph", value: "false" },
          ]}
        />
      </div>

      <div>
        <Text size="sm" fw={500} mb={3}>
          Text Style
        </Text>
        <SegmentedControl
          defaultValue={variant}
          size="xs"
          onChange={(value: string) => onPropsUpdate(id!, "variant", value)}
          data={[
            { label: "Text", value: "text" },
            { label: "Gradient", value: "gradient" },
          ]}
        />
      </div>

      <Divider />

      <div>
        <Text size="sm" fw={500} mb={3}>
          Text Alignment
        </Text>
        <SegmentedControl
          defaultValue={ta as string}
          size="xs"
          onChange={(value: any) => onPropsUpdate(id!, "ta", value)}
          data={[
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Justify", value: "justify" },
          ]}
        />
      </div>

      <Divider />

      <div>
        <Text size="sm" fw={500}>
          Top Spacing
        </Text>
        <Slider
          defaultValue={Number(mt)}
          step={1}
          min={0}
          max={100}
          onChange={(value: number) => onPropsUpdate(id!, "mt", value)}
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <div>
        <Text size="sm" fw={500}>
          Bottom Spacing
        </Text>
        <Slider
          defaultValue={Number(mb)}
          step={1}
          min={0}
          max={100}
          onChange={(value: number) => onPropsUpdate(id!, "mb", value)}
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

      <ColorInput
        defaultValue={color as string}
        onChange={(value: any) => onPropsUpdate(id!, "c", value)}
        label="Text color"
        description="Pick a text color, Click the picker icon on the right to pick from anywhere in the screen"
      />

      {variant === "gradient" ? (
        <>
          <div>
            <Text size="sm" fw={500} mb={1}>
              Gradient From
            </Text>

            <ColorPicker
              defaultValue={gradient?.from}
              onChange={(value: any) =>
                onPropsUpdate(id!, "gradient", {
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
              onChange={(value: any) =>
                onPropsUpdate(id!, "gradient", {
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
              onChange={(value: any) =>
                onPropsUpdate(id!, "gradient", {
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
        </>
      ) : (
        <div>
          <Text size="sm" fw={500}>
            Color
          </Text>

          <ColorPicker
            defaultValue={color}
            onChange={(value) => onPropsUpdate(id!, "color", value)}
            format="hex"
            withPicker={false}
            fullWidth
            swatches={colorSwatch}
          />
        </div>
      )}

      <Divider />

      <NativeSelect
        label="Size"
        description="Specify the text size"
        defaultValue={size}
        onChange={(event: any) =>
          onPropsUpdate(id!, "size", event.currentTarget.value)
        }
        data={["xs", "sm", "md", "lg", "xl"]}
      />

      <NativeSelect
        label="Line Clamp"
        description="Specify the number of lines after which Text will be truncated"
        defaultValue={lineClamp}
        onChange={(event: any) =>
          onPropsUpdate(id!, "lineClamp", Number(event.currentTarget.value))
        }
        data={["none", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
      />
    </Stack>
  );
}
