import { ReactNode } from "react";

export const ComponentsInfoGroup = { data: "data" } as const;
export type ComponentsInfoGroup =
  (typeof ComponentsInfoGroup)[keyof typeof ComponentsInfoGroup];

export type ComponentsInfo = {
  id?: string;
  name: string;
  group: ComponentsInfoGroup[];
  component: ReactNode;
  settingsComponent: ReactNode;
  defaultValue: Record<string, any>;
};
