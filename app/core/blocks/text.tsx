import { FC } from "react";
import Block, {
  baseSettings,
  BlockMetadata,
  BlockProps,
  DefaultBlocksProps,
  SettingsSection,
} from "./block";

type TextBlockProps = DefaultBlocksProps<{ content: string }>;

export const TextBlock: FC<TextBlockProps> = ({ props, onBlockChange }) => {
  const textSettings: SettingsSection[] = [
    {
      title: "Text",
      fields: [
        { label: "Font Size", value: "16px" },
        { label: "Font Color", value: "#000000" },
      ],
    },
    ...baseSettings,
  ];

  const handleSettingsUpdate = (updatedSettings: any) => {};

  return (
    <Block settings={textSettings} onSettingsUpdate={handleSettingsUpdate}>
      <div className="p-4 bg-gray-200 my-2 rounded">
        <p>{props.content}</p>
      </div>
    </Block>
  );
};
