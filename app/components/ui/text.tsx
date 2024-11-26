import { ComponentProps, FC } from "react";
import { ComponentInfo } from "../../core/block";

export type TextProps = ComponentProps<"p"> & {};

export const TextBlock: FC<TextProps> = ({}: TextProps) => {
  return <></>;
  // return (
  //   <Block
  //     id={id}
  //     type={type}
  //     settings={mergedSettings}
  //     onSettingsUpdate={handleSettingsUpdate}
  //     mode={mode}
  //     children={children}
  //   />
  // );
};

const TextValueType: ComponentInfo = {
  component: TextBlock,
  description: "",
  instructions: "",
  props: {},
  usageExample: `type: text`,
};

export default TextValueType;
