import { PluginActionFunction, PluginLoaderFunction } from "~/core/page/types/page";

export type SettingsTab = {
  id?: string;
  label: string;
  path: string;
  component: string;
  loader?: ReturnType<PluginLoaderFunction>;
  action?: ReturnType<PluginActionFunction>;
  icon?: string;
};

export type MenuType = "app" | "admin";
export type Menu = {
  id: number | string;
  label: string;
  path: string;
  icon?: string;
};
