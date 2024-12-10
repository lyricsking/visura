import { ComponentType, ReactNode } from "react";

export const ComponentsInfoGroup = {
  layout: "layout",
  display: "display",
  misc: "misc",
} as const;
export type ComponentsInfoGroup =
  (typeof ComponentsInfoGroup)[keyof typeof ComponentsInfoGroup];

export type BaseComponentsInfoProps = {
  id?: string;
  children?: ReactNode;
};

export type ComponentsInfo<
  T extends BaseComponentsInfoProps = BaseComponentsInfoProps
> = {
  name: string;
  group: ComponentsInfoGroup;
  component: ComponentType<any>;
  settingsComponent: ComponentType<any>;
  props: T;
};
