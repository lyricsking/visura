type MenuType = "app"|"admin";

const menu: Record<MenuType, Menu[]> = {};

export function addMenu(menuType: MenuType, menuItem: Menu){
  menu[menuType] = {
    ...menu[menuType],
    menuItem,
  }
}