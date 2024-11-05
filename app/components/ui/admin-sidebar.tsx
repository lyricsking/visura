import { Home, PanelLeft } from "lucide-react";
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
import Page from "./page";
import { renderIcon } from "./icon-loader";
import { Link, NavLink } from "@remix-run/react";

const items: Menu[]= [
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
    icon: "lucide-PanelLeft"
  }
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
                      to={item.path}
                      className={({ isActive, isPending }) =>
                        `flex items-center px-4 py-2 mt-5 text-gray-800 capitalize transition-colors duration-300 transform ${
                          isActive
                            ? "bg-gray-200 dark:bg-gray-700"
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

                      <span>{item.label}</span>
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
