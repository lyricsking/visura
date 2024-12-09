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
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";

type PageSettingsProps = ComponentsInfo<TextProps & BaseComponentsInfoProps>;

export const textInfo: PageSettingsProps = {
  name: "page",
  group: "layout",
  component: Text,
  settingsComponent: PageSetting,
  props: {},
};

export function PageSetting({ ...props }: PageSettingsProps["props"]) {
  const { id, c, gradient, lineClamp, size, span, ta, variant } = props;

  const { updateComponent } = useVisualBuilder();

  return <Stack mb={35}></Stack>;
}
