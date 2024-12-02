import { ComponentType, ReactNode } from "react";

export const ComponentsInfoGroup = {
  data: "data",
  typography: "typography",
} as const;
export type ComponentsInfoGroup =
  (typeof ComponentsInfoGroup)[keyof typeof ComponentsInfoGroup];

export type ComponentsInfo = {
  id?: string;
  name: string;
  group: ComponentsInfoGroup;
  component: ComponentType;
  settingsComponent: ComponentType;
  defaultValue: Record<string, any>;
};
