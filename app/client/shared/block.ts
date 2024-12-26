import { ComponentType } from "react";
import { TextProps, TextInfo } from "./components/ui/text";
import { ImageInfo, ImageProps } from "~/shared/components/ui/image";
import { SectionInfo, SectionProps } from "~/shared/components/ui/section";

/**
 *  A type representation of the structure of components map
 */
export type ComponentInfo = {
  /** The component function */
  component: ComponentType<any>;
  /** General descriptin of the component */
  description: string;
  /** A guide/instruction on how to use and integrate the component */
  instructions: string;
  /** A detailed list of props in the component accepts */
  props: { [key: string]: string };
  /** A string representation of code example showing our to use the component */
  usageExample: string;
};

export const componentsMap: Record<string, ComponentInfo> = {
  section: SectionInfo,
  text: TextInfo,
  image: ImageInfo,
} as const;

export type Blocks = (typeof componentsMap)[keyof typeof componentsMap];
export type BlockKeys = keyof typeof componentsMap;

export type BlockProps = SectionProps | TextProps | ImageProps;
export type BlockType =
  | { type: "section"; props: SectionProps }
  | { type: "text"; props: TextProps }
  | { type: "image"; props: ImageProps };

export type YAMLContent = {
  sections: BlockType[];
};

// export interface OnClickEvent {
//   type: "alert" | "navigation" | "submit" | "toggle";
//   data: {
//     path?: string;
//   };
// }

// // export interface XBlockProps
// //   extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
// //   onClick?: OnClickEvent;
// // }

// interface SettingField {
//   id?: string;
//   name: string;
//   value: any;
// }

// export interface SettingsSection {
//   title: string;
//   fields: SettingField[];
// }

// export interface XBlockProps {
//   id: string;
//   type: string;
//   settings: SettingsSection[];
//   onSettingsUpdate: (updatedSettings: SettingsSection[]) => void;
//   children: ReactNode;
//   mode: "editor" | "render";
// }

// export type DefaultBlocksProps = Pick<
//   XBlockProps,
//   "id" | "type" | "settings" | "onSettingsUpdate" | "mode"
// >;

// export type JSONDefaultBlocksProps = Pick<
//   XBlockProps,
//   "id" | "type" | "settings" | "mode"
// >;

// export const mergeSettings = (
//   defaultSettings: SettingsSection[],
//   providedSettings: SettingsSection[]
// ) => {
//   // Merge provided settings with defaults
//   return defaultSettings.map((defaultSection) => {
//     const providedSection = providedSettings.find(
//       (section) => section.title === defaultSection.title
//     );
//     return {
//       ...defaultSection,
//       ...providedSection, // Merge provided section if it exists
//       fields: defaultSection.fields.map((defaultField) => {
//         const providedField = providedSection?.fields.find(
//           (field) => field.name == defaultField.name
//         );
//         return { ...defaultField, ...providedField };
//       }),
//     };
//   });
// };

// export const generateStyles = (
//   settings: SettingsSection[]
// ): React.CSSProperties => {
//   const styleObject: React.CSSProperties = {};

//   const styleSection = settings.find((section) => section.title === "styles");
//   styleSection?.fields.forEach((field) => {
//     styleObject[field.name as keyof React.CSSProperties] = field.value;
//   });

//   return styleObject;
// };

// export const baseSettings: SettingsSection[] = [
//   {
//     title: "General",
//     fields: [
//       { name: "Background  Color", value: "#ffffff" },
//       { name: "Padding", value: "10px" },
//     ],
//   },
// ];

// export default function Block({
//   type,
//   settings: initialSettings,
//   onSettingsUpdate,
//   children,
//   mode,
// }: XBlockProps) {
//   const [settings, setSettings] = useState<SettingsSection[]>(initialSettings);
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const handleUpdate = (
//     sectionIndex: number,
//     fieldIndex: number,
//     value: any
//   ) => {
//     const updatedSettings = [...settings];
//     updatedSettings[sectionIndex].fields[fieldIndex].value = value;
//     // onSettingsUpdate(updatedSettings);
//     setSettings(updatedSettings);
//   };

//   return mode === "render"
//     ? children
//     : settings.map((section, sectionIndex) => (
//         <div key={sectionIndex}>
//           <h4>{section.title}</h4>
//           {section.fields.map((field, fieldIndex) => (
//             <div key={fieldIndex}>
//               <label>{field.name}</label>
//               <input
//                 type="text"
//                 value={field.value}
//                 onChange={(e) => {
//                   // handleUpdate(sectionIndex, fieldIndex, e.target.value);
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       ));
// }
