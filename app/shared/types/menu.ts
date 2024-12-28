export type SettingsTab = {
  id?: string;
  label: string;
  path: string;
  component: string;
  icon?: string;
};

export type MenuType = "app" | "admin";
export type Menu = {
  id: number | string;
  label: string;
  path: string;
  icon?: string;
  position?: number;
};
