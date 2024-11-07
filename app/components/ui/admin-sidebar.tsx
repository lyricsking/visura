import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../sidebar";
import { Menu } from "~/types/menu";
import { renderIcon } from "./icon-loader";
import { NavLink } from "@remix-run/react";
import { Settings2 } from "lucide-react";

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
    path: "/administration/pages",
    // icon: "lucide-PanelLeft",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/administration/settings",
    // icon: "lucide-Settings",
  },
];

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={({ isActive, isPending }) =>
                        `py-2 px-2 text-gray-800 rounded-md capitalize transition-colors duration-300 transform ${
                          isActive
                            ? "bg-gray-100 dark:bg-gray-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        } ${isPending ? "animate-none" : ""}`
                      }
                      end={true}
                    >
                      {item.icon &&
                        renderIcon({
                          icon: item.icon,
                          className: "w-5 h-5 inline-block mr-2",
                        })}
                      {item.label}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
