import { NavLink } from "@remix-run/react";
import { Menu } from "~/types/menu";
import { renderIcon } from "./icon-loader";
import { cn } from "~/utils/util";

export type NavbarProps = {
  menu: Menu[];
};

export function Navbar() {
  const menu: Menu[] = [
    {
      id: "home",
      label: "Home",
      path: "/administration",
      icon: "lucide-Home",
    },
    {
      id: "page",
      label: "Page",
      path: "/administration/pages",
      icon: "lucide-PanelLeft",
    },
    {
      id: "settings",
      label: "Settings",
      path: "/administration/settings",
      icon: "lucide-Settings",
    },
  ];

  return (
    <nav className="hidden md:flex md:flex-row gap-1 text-lg font-medium md:items-center md:text-xs">
      {menu.map((menu) => {
        return (
          <NavLink
            key={menu.id}
            to={menu.path}
            className={({ isActive, isPending }) =>
              cn(
                "py-2 px-2 text-gray-800 rounded-md capitalize transition-colors duration-300 transform",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive && "bg-gray-100 dark:bg-gray-700",
                isPending && "animate-none"
              )
            }
            end={true}
          >
            {/* {menu.icon &&
              renderIcon({
                icon: menu.icon,
                className: "w-5 h-5 inline-block mr-2",
              })} */}
            {menu.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
