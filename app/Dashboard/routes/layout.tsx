import { Link, Outlet, UIMatch, useLocation, useMatches, useSearchParams } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import pkg from "../../../package.json";
import AccountMenuButton from "~/components/ui/account.menu.button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "~/components/sheet";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Breadcrumb from "~/components/breadcrumb";
import { useRef } from "react";

export const handle = {
  breadcrumb: () => <Link to="/dashboard">Dashboard</Link>
};

export default function Layout() {
  const matches = useMatches();
  
  const currentRoute: any = matches.at(-1);

  const [searchParams, setSearchParams] = useSearchParams();
  const isSidebarOpen = searchParams.get("sidebar") === "open";
  const toggleSidebar = () => {
  

    if (isSidebarOpen) {
      searchParams.delete("sidebar");
    } else {
      searchParams.set("sidebar", "open");
    }
    setSearchParams(searchParams, { replace: true });
  };
 
  const sidebarMenuRef = useRef<any>(null);
  const getSidebarMenu = () => {
    if (sidebarMenuRef.current) {
      return sidebarMenuRef.current();
    }
    return null;
  };

  const breadcrumbs: any[] = [];
  matches.forEach((match: any) => {
    if (match && match.handle && match.handle.breadcrumb) {
      const mBreadcrumbs = match.handle.breadcrumb();
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
          <DrawerMenu
            children={getSidebarMenu()}
            isOpen={isSidebarOpen}
            setIsOpen={toggleSidebar}
          />
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

export type DrawerMenuProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean)=>void
};

function DrawerMenu({ children, isOpen, setIsOpen }: DrawerMenuProps) {
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Bars3Icon className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent>
        {/* Handle func sidebar func call here */}
        {children}
      </SheetContent>
    </Sheet>
  );
}
