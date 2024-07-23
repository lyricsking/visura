import { Link, Outlet, UIMatch, useLocation, useMatches, useSearchParams } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import pkg from "../../../package.json";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/sheet";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Breadcrumb from "~/components/breadcrumb";
import { useEffect, useRef } from "react";
import AccountMenuButton from "../components/account-menu-button";
import { SidebarContent, SidebarContentProps, SidebarMenuProps } from "../components/sidebar-content";

export const handle = {
  breadcrumb: {
    id: "dashboard",
    label: "Dashboard",
    path:"/dashboard"
  }
};

export default function Layout() {
  const matches = useMatches();
  const currentRoute: any = matches.at(-1);

  const sidebarMenuRef = useRef<any>(null);
  const getSidebarMenu = () => {
    if (sidebarMenuRef.current) {
      return sidebarMenuRef.current;
    }
    return [];
  };

  const breadcrumbs: any[] = [];
  matches.forEach((match: any) => {
    if (match && match.handle && match.handle.breadcrumb) {
      const mBreadcrumbs = match.handle.breadcrumb;
      if (Array.isArray(mBreadcrumbs)) {
        breadcrumbs.push(...mBreadcrumbs);
      } else {
        breadcrumbs.push(mBreadcrumbs);
      }
    }
  });

  return (
    <PageLayout>
      <PageLayoutHeader position={"sticky"} className="bg-white" >
        <PageLayoutHeaderItem className="border">
          <Link to={"/"} replace className="w-full">
            <h1 className="text-[28px] font-bold text-center tracking-tight">
              {pkg.name}.
            </h1>
          </Link>
        </PageLayoutHeaderItem>

        <PageLayoutHeaderItem
          spacing={"compact"}
          className="border-b border-s border-e"
        >
          <DrawerMenu menus={getSidebarMenu()}  />
          <div className="w-full md:hidden">
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </div>
          <AccountMenuButton />
        </PageLayoutHeaderItem>

        <PageLayoutHeaderItem className="hidden md:inline-flex">
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </PageLayoutHeaderItem>
      </PageLayoutHeader>

      <PageLayoutContent>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{currentRoute.handle.pageName}</h1> 
        </div>
        <Outlet context={{ appname: pkg.name, sidebarMenuRef }} />
      </PageLayoutContent>
    </PageLayout>
  );
}

type DrawerMenuProps = {
  menus: SidebarMenuProps[];
};

function DrawerMenu({ menus }: DrawerMenuProps) {
  
  return (
    <Sheet>
      <SheetTrigger>
        <Bars3Icon className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent>
        <SidebarContent menus={menus} />
      </SheetContent>
    </Sheet>
  );
}