import { ComponentType, ReactNode } from "react";
import { PropsUpdateFunction } from "../../client/features/visual-builder/components/visual-builder.provider";

export const ComponentsInfoGroup = {
  layout: "layout",
  display: "display",
  misc: "misc",
  sections: "sections",
} as const;
export type ComponentsInfoGroup =
  (typeof ComponentsInfoGroup)[keyof typeof ComponentsInfoGroup];

export type BaseComponentsInfoProps = {
  id?: string;
  children?: ReactNode;
  onPropsUpdate: PropsUpdateFunction;
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
