import { NavLink } from "@remix-run/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  sidebarMenuButtonVariants,
  SidebarMenuItem,
} from "~/components/sidebar";
import { renderIcon } from "~/components/ui/icon-loader";
import { Menu } from "~/types/menu";
import { cn } from "../utils/util";
import { useState } from "react";

const items: Menu[] = [
  {
    id: "home",
    label: "Home",
    path: "/administration",
    // icon: "lucide-Home",
  },
  {
    id: "page",
    label: "Page",
    path: "pages",
    // icon: "lucide-PanelLeft",
  },
  {
    id: "settings",
    label: "Settings",
    path: "settings",
    // icon: "lucide-Settings",
  },
];

export function BlockSettingSidebar() {
    const [open, setOpen] = useState(false);

  return (
    <Sidebar side="right" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive, isPending }) =>
                      cn(
                        sidebarMenuButtonVariants(),
                        // "w-full  py-2 px-2 text-gray-800 rounded-md capitalize transition-colors duration-300 transform",
                        // "hover:bg-gray-100 dark:hover:bg-gray-700",
                        isActive && "bg-gray-100 dark:bg-gray-700",
                        isPending && "animate-none"
                      )
                    }
                    end={item.path === "/administration" ? true : false}
                  >
                    {item.icon &&
                      renderIcon({
                        icon: item.icon,
                        className: "w-5 h-5 inline-block mr-2",
                      })}
                    {item.label}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
