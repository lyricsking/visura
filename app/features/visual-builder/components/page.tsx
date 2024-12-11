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
  Container,
  ContainerProps,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";

type PageSettingsProps = ComponentsInfo<
  ContainerProps & BaseComponentsInfoProps
>;

export const pageInfo: PageSettingsProps = {
  name: "page",
  group: "layout",
  component: Container,
  settingsComponent: PageSetting,
  props: { 
  onPropsUpdate: () => {},fluid: true },
};

export function PageSetting({ ...props }: PageSettingsProps["props"]) {
  const { id } = props;

  return <Stack mb={35}></Stack>;
}
