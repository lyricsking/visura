import { FC, HTMLAttributes, ReactNode, useState } from "react";
import Button from "~/components/button";

export const Blocks = {
  div: "div",
  header: "header",
  main: "main",
  section: "section",
  footer: "footer",
  h1: "h1",
  h2: "h2",
  p: "p",
  button: Button,
} as const;

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

export interface SettingsSection {
  title: string;
  fields: Array<{ label: string; value: any; onChange: (value: any) => void }>;
}

export interface BlockProps {
  settings: SettingsSection[];
  onSettingsUpdate: (updatedSettings: SettingsSection[]) => void;
  children: ReactNode;
}

export interface BlockMetadata<T = {}> {
  id: string;
  type: string;
  props: T;
  blocks: BlockMetadata<any>[];
}

const Block: FC<BlockProps> = ({
  settings: initialSettings,
  onSettingsUpdate,
  children,
}) => {
  const [settings, setSettings] = useState<SettingsSection[]>(initialSettings);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleUpdate = (
    sectionIndex: number,
    fieldIndex: number,
    value: any
  ) => {
    const updatedSettings = [...settings];
    updatedSettings[sectionIndex].fields[fieldIndex].value = value;
    onSettingsUpdate(updatedSettings);
  };

  return (
    <div onClick={() => setDialogOpen(true)}>
      {children}
      {isDialogOpen && (
        <div className="">
          <h4>Block settings</h4>
          {settings.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h4>{section.title}</h4>
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      handleUpdate(sectionIndex, fieldIndex, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
          <button onClick={() => setDialogOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};
export default Block;

export const baseSettings: SettingsSection[] = [
  {
    title: "General",
    fields: [
      {
        label: "Background  Color",
        value: "#ffffff",
        onChange: (value: string) => {},
      },
      { label: "Padding", value: "10px", onChange: (value: string) => {} },
    ],
  },
];
