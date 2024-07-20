import { Link, Outlet, UIMatch, useMatches } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/Shared/components/ui/page.layout";
import pkg from "../../package.json";
import AccountMenuButton from "~/Shared/components/ui/account.menu.button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/Shared/components/sheet";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Breadcrumb from "~/Shared/components/breadcrumb";
import { Dispatch, SetStateAction, useState } from "react";

export const handle = {
  breadcrumb: () => <Link to="/dashboard">Dashboard</Link>,
  sidebarContent: () => (
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This is from layout.tsx handle func</SheetDescription>
    </SheetHeader>
  ),
};

export default function Layout() {
  const matches = useMatches();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sidebarMenuRef = useRef<any>(null);
  const getSidebarMenu = () => {
    if (sidebarMenuRef.current) {
      return sidebarMenuRef.current();
    }
    return null;
  };

  const isSidebarOpen = searchParams.get('sidebar') === 'open';
  const toggleSidebar = () => {
    if (isSidebarOpen) {
      searchParams.delete('sidebar');
    } else {
      searchParams.set('sidebar', 'open');
    }
    setSearchParams(searchParams, { replace: true });
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
      <PageLayoutHeader>
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
          <DrawerMenu isOpen={isSidebarOpen} children={getSidebarMenu()} />
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
        <Outlet context={{ appname: pkg.name, sidebarMenuRef }} />
      </PageLayoutContent>
    </PageLayout>
  );
}

export type DrawerMenuProps = {
  children?: React.ReactNode;
  isOpen: boolean;
};

function DrawerMenu({ children, isOpen }: DrawerMenuProps) {
  
  return (
    <Sheet open={isOpen}>
      <SheetTrigger>
        <Bars3Icon className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent>
        {/* Handle func sidebar func call here */}
        { children }
      </SheetContent>
    </Sheet>
  );
}
