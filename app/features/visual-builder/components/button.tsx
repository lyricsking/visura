import {
  Text,
  Stack,
  SegmentedControl,
  Divider,
  TextInput,
  NativeSelect,
  Slider,
  ButtonProps,
  Button,
  ColorPicker,
  Switch,
  PolymorphicComponentProps,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { colorSwatch } from "../utils/color";
import { marks } from "../utils/marks";

export type ButtonSettingsProps = ComponentsInfo<
  BaseComponentsInfoProps &
    PolymorphicComponentProps<"button" | "a", ButtonProps> & { href: string }
>;

export const buttonInfo: ButtonSettingsProps = {
  name: "Button",
  group: "display",
  component: Button,
  settingsComponent: ButtonSetting,
  props: {
    onPropsUpdate: () => {},
    children: "Button Text",
    color: "#228be6",
    hiddenFrom: undefined,
    href: "http://example.com",
    variant: "filled",
    size: "sm",
    my: 0,
    mx: 0,
  },
};

export function ButtonSetting(props: ButtonSettingsProps["props"]) {
  const {
    id,
    color,
    children,
    component,
    disabled,
    hiddenFrom,
    fullWidth,
    gradient,
    href,
    mt,
    mb,
    mx,
    size,
    variant,
    onPropsUpdate,
  } = props;

  return (
    <Stack pb={35} px={5}>
      <TextInput
        label="Button Type"
        description="Specify button text."
        defaultValue={String(children)}
        placeholder="Type button text"
        onChange={(event) =>
          onPropsUpdate(id!, "children", event.currentTarget.value)
        }
      />

      <NativeSelect
        label="Type"
        description="Specify the button size"
        defaultValue={variant}
        onChange={(event: any) =>
          onPropsUpdate(id!, "variant", event.currentTarget.value)
        }
        data={[
          { label: "Default", value: "default" },
          { label: "Gradient", value: "gradient" },
          { label: "Filled", value: "filled" },
          { label: "Light", value: "light" },
          { label: "Outline", value: "outline" },
          { label: "Subtle", value: "subtle" },
          { label: "Transparent", value: "transparent" },
          { label: "White", value: "white" },
        ]}
      />

      <div>
        <Text size="sm" fw={500} mb={3}>
          Use as
        </Text>
        <SegmentedControl
          defaultValue={component}
          onChange={(value: any) => onPropsUpdate(id!, "component", value)}
          data={[
            { label: "Button", value: "button" },
            { label: "Link", value: "a" },
          ]}
        />
      </div>

      {component === "a" && (
        <TextInput
          label="Link URL"
          description="Specify link url"
          defaultValue={String(href)}
          placeholder="Type button text"
          onChange={(event) =>
            onPropsUpdate(id!, "href", event.currentTarget.value)
          }
        />
      )}

      <Switch
        defaultChecked={disabled}
        label="Disable"
        labelPosition="left"
        onChange={(event) =>
          onPropsUpdate(id!, "disabled", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={!!hiddenFrom}
        label="Hide"
        labelPosition="left"
        onChange={(event) =>
          onPropsUpdate(
            id!,
            "hiddenFrom",
            event.currentTarget.checked ? "sm" : undefined
          )
        }
      />

      <Divider />

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

      <div>
        <Text size="sm" fw={500}>
          Size
        </Text>
        <Slider
          defaultValue={marks.find((mark) => mark.label === size)!.value}
          label={(val) => marks.find((mark) => mark.value === val)!.label}
          step={20}
          marks={marks}
          onChange={(value: number) =>
            onPropsUpdate(
              id!,
              "size",
              marks.find((mark) => mark.value === value)!.label
            )
          }
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <div>
        <Text size="sm" fw={500}>
          Radius
        </Text>
        <Slider
          defaultValue={marks.find((mark) => mark.label === size)!.value}
          label={(val) => marks.find((mark) => mark.value === val)!.label}
          step={20}
          marks={marks}
          onChange={(value: number) =>
            onPropsUpdate(
              id!,
              "radius",
              marks.find((mark) => mark.value === value)!.label
            )
          }
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <Switch
        defaultChecked={fullWidth}
        label="Full width"
        description="Specify if you want button to fill available space."
        labelPosition={"left"}
        onChange={(event) =>
          onPropsUpdate(id!, "fullWidth", event.currentTarget.checked)
        }
      />

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
    </Stack>
  );
}
