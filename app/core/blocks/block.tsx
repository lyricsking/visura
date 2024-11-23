import { FC, ReactNode, useState } from "react";
import Button from "~/components/button";
import { TextBlock } from "./text";
import { ImageBlock } from "./image";

import { Dialog, DialogContent, DialogTrigger } from "~/components/dialog";

export const Blocks = {
  text: TextBlock,
  image: ImageBlock,
  // button: Button,
  // div: "div",
  // header: "header",
  // main: "main",
  // section: "section",
  // footer: "footer",
  // h1: "h1",
  // h2: "h2",
  // p: "p",
} as const;
export type Blocks = (typeof Blocks)[keyof typeof Blocks];
export type BlockType = keyof typeof Blocks;

export interface OnClickEvent {
  type: "alert" | "navigation" | "submit" | "toggle";
  data: {
    path?: string;
  };
}

// export interface BlockProps
//   extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
//   onClick?: OnClickEvent;
// }

interface SettingField {
  id?: string;
  name: string;
  value: any;
}

export interface SettingsSection {
  title: string;
  fields: SettingField[];
}

export interface BlockProps {
  id: string;
  type: string;
  settings: SettingsSection[];
  onSettingsUpdate: (updatedSettings: SettingsSection[]) => void;
  children: ReactNode;
  mode: "editor" | "render";
}

export type DefaultBlocksProps = Pick<
  BlockProps,
  "id" | "type" | "settings" | "onSettingsUpdate" | "mode"
>;

export type JSONDefaultBlocksProps = Pick<
  BlockProps,
  "id" | "type" | "settings" | "mode"
>;

export const mergeSettings = (
  defaultSettings: SettingsSection[],
  providedSettings: SettingsSection[]
) => {
  // Merge provided settings with defaults
  return defaultSettings.map((defaultSection) => {
    const providedSection = providedSettings.find(
      (section) => section.title === defaultSection.title
    );
    return {
      ...defaultSection,
      ...providedSection, // Merge provided section if it exists
      fields: defaultSection.fields.map((defaultField) => {
        const providedField = providedSection?.fields.find(
          (field) => field.name == defaultField.name
        );
        return { ...defaultField, ...providedField };
      }),
    };
  });
};

export const generateStyles = (
  settings: SettingsSection[]
): React.CSSProperties => {
  const styleObject: React.CSSProperties = {};

  const styleSection = settings.find((section) => section.title === "styles");
  styleSection?.fields.forEach((field) => {
    styleObject[field.name as keyof React.CSSProperties] = field.value;
  });

  return styleObject;
};

export const baseSettings: SettingsSection[] = [
  {
    title: "General",
    fields: [
      { name: "Background  Color", value: "#ffffff" },
      { name: "Padding", value: "10px" },
    ],
  },
];

export default function Block({
  type,
  settings: initialSettings,
  onSettingsUpdate,
  children,
  mode,
}: BlockProps) {
  const [settings, setSettings] = useState<SettingsSection[]>(initialSettings);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleUpdate = (
    sectionIndex: number,
    fieldIndex: number,
    value: any
  ) => {
    const updatedSettings = [...settings];
    updatedSettings[sectionIndex].fields[fieldIndex].value = value;
    // onSettingsUpdate(updatedSettings);
    setSettings(updatedSettings);
  };

  return mode === "render"
    ? children
    : settings.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h4>{section.title}</h4>
          {section.fields.map((field, fieldIndex) => (
            <div key={fieldIndex}>
              <label>{field.name}</label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => {
                  // handleUpdate(sectionIndex, fieldIndex, e.target.value);
                }}
              />
            </div>
          ))}
        </div>
      ));
}
