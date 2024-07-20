import { Link, Outlet, UIMatch, useMatches } from "@remix-run/react";
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/sheet";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Breadcrumb from "~/components/breadcrumb";
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
          <DrawerMenu routes={[...matches].reverse()} />
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
        <Outlet context={{ appname: pkg.name }} />
      </PageLayoutContent>
    </PageLayout>
  );
}

export type DashboardSidebarProps = {
  route: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function DrawerMenu({ routes }: { routes: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const route = routes.find(
    (route) => route.handle && route.handle.sidebarContent
  );

  const params: DashboardSidebarProps = {
    route,
    setIsOpen,
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Bars3Icon className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent>
        {/* Handle func sidebar func call here */}
        {route.handle.sidebarContent(params)}
      </SheetContent>
    </Sheet>
  );
}
