import { FC } from "react";
import Block, {
  baseSettings,
  DefaultBlocksProps,
  mergeSettings,
  SettingsSection,
} from "./block";

export const TextBlock: FC<DefaultBlocksProps> = ({
  id,
  type,
  settings = [],
  mode,
}) => {
  const textDefaultSettings: SettingsSection[] = [
    {
      title: "Text",
      fields: [
        { name: "content", value: "First" },
        { name: "Font Size", value: "16px" },
        { name: "Font Color", value: "#000000" },
      ],
    },
    ...baseSettings,
  ];

  // Merge provided settings with defaults
  const mergedSettings = mergeSettings(textDefaultSettings, settings);
  // Find the section with title same as component key
  const textSection = mergedSettings.find(
    (section) => section.title === "Text"
  );
  // Find the field with label "content" within the "text" Section
  const valueField = textSection?.fields.find(
    (field) => field.name === "content"
  );
  const handleSettingsUpdate = (updatedSettings: any) => {};

  const children = <p>{valueField?.value || "Input text"}</p>;

  if (mode === "editor") {
    return (
      <Block
        id={id}
        type={type}
        settings={mergedSettings}
        onSettingsUpdate={handleSettingsUpdate}
      >
        {children}
      </Block>
    );
  }
  
  return children;
};
