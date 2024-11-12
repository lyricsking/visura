import { FC } from "react";
import Block, {
  baseSettings,
  BlockMetadata,
  BlockProps,
  SettingsSection,
} from "./block";

type TextBlockProps = Pick<
  BlockMetadata<{ content: string }>,
  "id" | "props" | "blocks"
>;

export const TextBlock: FC<TextBlockProps> = ({ props }: TextBlockProps) => {
  const textSettings: SettingsSection[] = [
    {
      title: "Text",
      fields: [
        { label: "Font Size", value: "16px", onChange: (value: string) => {} },
        {
          label: "Font Color",
          value: "#000000",
          onChange: (value: string) => {},
        },
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
