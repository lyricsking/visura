import { NavLink } from "@remix-run/react";
import React, {
  Component,
  ExoticComponent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useLocation, useSearchParams } from "@remix-run/react";
import pkg from "../../../package.json";
import { Sheet, SheetContent, SheetTrigger } from "~/components/sheet";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { Menu } from "lucide-react";
import Button from "~/components/button";

export type SidebarMenu = {
  id: number | string;
  label: string;
  url: string;
  icon?: React.ElementType;
};

export type SidebarContentProps = {
  menu: SidebarMenu[];
  side?: "top" | "bottom" | "left" | "right";
};

export function DrawerMenu({ menu, side = "left" }: SidebarContentProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-0 ">
        <Button size="icon" className="shrink-0">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-5/6" side={side}>
        <div className="flex flex-col" aria-label="Sidebar">
          <div className="flex items-center justify-center h-20 border-b border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl font-semibold" aria-label="Logo">
              {pkg.name}
            </h1>
          </div>

          <nav className="grid gap-6 text-lg font-medium">
            <ul>
              {menu.map((menu) => {
                const Icon = menu.icon;

                return (
                  <li key={menu.id}>
                    <NavLink
                      to={menu.url}
                      className={({ isActive, isPending }) =>
                        `flex items-center px-4 py-2 mt-5 text-gray-800 capitalize transition-colors duration-300 transform ${
                          isActive
                            ? "bg-gray-100 dark:bg-gray-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        } ${isPending ? "animate-none" : ""}`
                      }
                      end={true}
                    >
                      {Icon && <Icon className="w-5 h-5 inline-block mr-2" />}
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
