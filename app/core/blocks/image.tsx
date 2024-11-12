import Button from "~/components/button";
import Block, { baseSettings, BlockProps, SettingsSection } from "./block";
import { FC } from "react";

interface ImageBlockProps extends BlockProps {
  src: string;
  alt: string;
  className: string;
}

export const ImageBlock: FC<ImageBlockProps> = ({ src, alt }) => {
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
        {src && alt ? (
          <img src={src} alt={alt} className="" />
        ) : (
          <div className="bg-blue-500">Upload image</div>
        )}
      </div>
    </Block>
  );
};
