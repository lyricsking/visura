import { Menu } from "~/utils/menu";

export type MenuType = "app" | "admin";

const menu: Record<MenuType, Menu[]> = {
  app: [],
  admin: [],
};

export function addMenu(menuType: MenuType, menuItem: Menu) {
  menu[menuType] = [...menu[menuType], menuItem];
}
