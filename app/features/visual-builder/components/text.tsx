import {
  ColorInput,
  Text as MantineText,
  SegmentedControl,
} from "@mantine/core";
import { ComponentsInfo } from "../types/builder.components";

export function MantineTextSetting() {
  return (
    <div>
      <SegmentedControl
        data={[
          { label: "React", value: "react" },
          { label: "Angular", value: "ng" },
          { label: "Vue", value: "vue" },
          { label: "Svelte", value: "svelte" },
        ]}
      />
      <ColorInput
        variant="filled"
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
      />
    </div>
  );
}

export const textInfo: ComponentsInfo = {
  name: "text",
  group: "typography",
  component: MantineText,
  settingsComponent: MantineTextSetting,
  defaultValue: {
    children: "text",
    c: "blue",
    fw: "400",
    gradient: "",
    lineClamp: "",
    size: "",
    span: false,
    ta: "",
    td: "",
    truncate: "",
    tt: "",
    variant: "",
  },
};
