import { NavLink } from "@remix-run/react";
import { MutableRefObject } from "react";

export type SidebarMenuProps = {
  id: number | string,
  label: string,
  url: string
}

export type MenuFunctionType = () => SidebarMenuProps[];

export type SidebarContentProps = {
  menus: SidebarMenuProps[]
};

export const SidebarContent = ({ menus }: SidebarContentProps) => {
  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            <NavLink
              to={menu.url}
              className={({ isActive, isPending }) =>
                `flex items-center px-4 py-2 mt-5 text-gray-800 capitalize transition-colors duration-300 transform ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${isPending ? "animate-pulse" : ""}`
              }
              end={true}
            >
              {menu.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
