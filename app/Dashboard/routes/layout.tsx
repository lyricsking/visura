import {
  Link,
  Outlet,
  UIMatch,
  useLocation,
  useMatches,
  useSearchParams,
} from "@remix-run/react";
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
import {
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AccountMenuButton from "../components/account-menu-button";
import {
  MenuFunctionType,
  SidebarContent,
  SidebarContentProps,
  SidebarMenuProps,
} from "../components/sidebar-content";
import { set } from "mongoose";

export const handle = {
  breadcrumb: {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
};

export default function Layout() {
  const matches = useMatches();
  const location = useLocation();
  const currentRoute: any = matches.at(-1);

  const sidebarMenuRef = useRef<MenuFunctionType | null>(null);

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
    <PageLayout className="bg-gray-100">
      <PageLayoutHeader position={"sticky"} className="bg-white">
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
          <DrawerMenu menusFnRef={sidebarMenuRef} />
          <div className="w-full md:hidden">
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </div>
          <AccountMenuButton />
        </PageLayoutHeaderItem>

        <PageLayoutHeaderItem className="hidden sticky md:inline-flex">
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </PageLayoutHeaderItem>
      </PageLayoutHeader>

      <PageLayoutContent>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentRoute.handle.pageName}
          </h1>
          <div className="py-8">
            <Outlet context={{ appname: pkg.name, sidebarMenuRef }} />
          </div>
        </div>
      </PageLayoutContent>
    </PageLayout>
  );
}

type DrawerMenuProps = {
  menusFnRef: MutableRefObject<MenuFunctionType | null>;
};

function DrawerMenu({ menusFnRef }: DrawerMenuProps) {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.get("showMenu") === "true";

  const [menus, setMenus] = useState<SidebarMenuProps[]>();

  const toggleSidebar = () => {
    if (isOpen) {
      searchParams.delete("showMenu");
    } else {
      searchParams.set("showMenu", "true");
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    const defaultMenusFnRef = [
      {
        id: "orders",
        label: "Orders",
        url: "/dashboard/orders",
      },
      {
        id: "subscriptions",
        label: "Subscription",
        url: "/dashboard/subscriptions",
      },
      {
        id: "invoices",
        label: "Invoices",
        url: "/dashboard/invoices",
      },
      {
        id: "transactions",
        label: "Transactions",
        url: "/dashboard/transactions",
      },
      {
        id: "settings",
        label: "Settings",
        url: "/dashboard/settings",
      },
      {
        id: "support",
        label: "Support Center",
        url: "/support",
      },
    ];

    if (menusFnRef.current) {
      setMenus(menusFnRef.current() || defaultMenusFnRef);
    }
  }, [menusFnRef.current, location.pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={toggleSidebar}>
      <SheetTrigger>
        <Bars3Icon className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent className="w-5/6">
        <div className="flex flex-col" aria-label="Sidebar">
          <div className="flex items-center justify-center h-20 border-b border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl font-semibold" aria-label="Logo">
              {pkg.name}
            </h1>
          </div>

          <SidebarContent menus={menus!} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
