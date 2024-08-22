import { NavLink } from "@remix-run/react";
import { Link } from "lucide-react";
import { Menu } from "./sidebar";

export type NavbarProps = {
  menu: Menu[];
};

export function Navbar({ menu }: NavbarProps) {
  return (
    <nav className="hidden md:flex md:flex-row gap-1 text-lg font-medium md:items-center md:text-xs">
      {menu.map((menu) => {
        return (
          <NavLink
            key={menu.id}
            to={menu.url}
            className={({ isActive, isPending }) =>
              `py-2 px-2 text-gray-800 rounded-md capitalize transition-colors duration-300 transform ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              } ${isPending ? "animate-none" : ""}`
            }
            end={true}
          >
            {menu.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
