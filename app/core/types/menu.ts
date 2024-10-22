export type MenuType = "app" | "admin";
export type Menu = {
  id: number | string;
  label: string;
  path: string;
  icon?: string;
};
