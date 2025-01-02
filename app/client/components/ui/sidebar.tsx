import { NavLink } from "@remix-run/react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "~/shared/components/sheet";
import Button from "~/shared/components/button";
import { renderIcon } from "./icon-loader";
import { Menu } from "~/core/types/menu";
import { Menu as MenuIcon } from "lucide-react";

export type SidebarContentProps = {
  appName: string;
  menu: Menu[];
  side?: "top" | "bottom" | "left" | "right";
};

export function Sidebar({ appName, menu, side = "left" }: SidebarContentProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button size="sm" variant="ghost" className="px-0">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-5/6" side={side}>
        <div className="flex flex-col" aria-label="Sidebar">
          <div className="flex items-center justify-center h-20 border-b border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl font-semibold" aria-label="Logo">
              {appName}
            </h1>
          </div>

          <nav className="grid gap-6 text-lg font-medium">
            <ul>
              {menu.map((menu) => {
                // const Icon = menu.icon;

                return (
                  <li key={menu.id}>
                    <NavLink
                      to={menu.path}
                      className={({ isActive, isPending }) =>
                        `flex items-center px-4 py-2 mt-5 text-gray-800 capitalize transition-colors duration-300 transform ${
                          isActive
                            ? "bg-gray-100 dark:bg-gray-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        } ${isPending ? "animate-none" : ""}`
                      }
                      end={true}
                    >
                      {/* {Icon && <Icon className="w-5 h-5 inline-block mr-2" />}*/}
                      {menu.icon &&
                        renderIcon({
                          icon: menu.icon,
                          className: "w-5 h-5 inline-block mr-2",
                        })}

                      {menu.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
