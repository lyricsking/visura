import { ScrollArea } from "@radix-ui/react-scroll-area";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useMatches,
} from "@remix-run/react";
import {
  isAuthenticated,
  getUserFromSession,
  setUserToSession,
} from "~/core/auth/server/auth.server";
import { isAuthUser } from "~/core/auth/utils/helper";
import Breadcrumb from "~/components/breadcrumb";
import { ScrollBar } from "~/components/scrollable.area";
import { Navbar } from "~/components/ui/navbar";
import {
  PageLayout,
  PageLayoutHeader,
  PageLayoutHeaderItem,
  PageLayoutContent,
} from "~/components/ui/page.layout";
import {
  findOrCreateUserProfiles,
  findUser,
} from "~/core/user/server/user.server";
import { getSubdomain } from "~/utils/domain";
import { cn } from "~/utils/util";
import HeaderIcons from "../components/header-icons";
import { Sidebar } from "~/components/ui/sidebar";
import { Menu } from "~/types/menu";
import { APP_NAME, getAppContext } from "~/app";
import { SidebarProvider, SidebarTrigger } from "~/components/sidebar";
import { AdminSidebar } from "~/components/ui/admin-sidebar";

export const handle = {
  breadcrumb: {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the authenticated user or redirects to auth page
  const auth = await isAuthenticated(request);

  if (auth && typeof auth === "string") {
    return redirect(auth);
  }

  // check the subdomain we are accessing the page from, useed to manage staff users access.
  let subdomain = getSubdomain(request);
  // if the user has role access to the subdomain
  // Get the cache user object from session, could be undefined or IHydrated user.
  let user = await getUserFromSession(request);
  // If the authUser object returned from authentication is of type AuthUser
  // (i.e user is authenticated) but the the cache user is null or undefined,
  // it means the cached user is invalidated, so we fetch a new object
  // from server and cache.
  if (isAuthUser(auth) && !user) {
    // Cache invalidated, we fetch a new user object
    user = (await findUser({ email: auth.email }))!;

    await setUserToSession(request, user);
  }

  const app = await getAppContext();

  // If additional admin menu is provided
  const adminMenu = app?.dashboardMenu;
  // Return user object if provided.
  return json({
    appName: app.configs(APP_NAME),
    menu: adminMenu,
    ...(user && { user }),
  });
};

export default function Layout() {
  const data = useLoaderData<typeof loader>();
  let location = useLocation();

  const matches = useMatches();
  const currentRoute: any = matches.at(-1);
  const parentRoute: any = matches.at(-2);

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

  let currentpage =
    currentRoute?.handle?.pageName || parentRoute?.handle?.pageName;
  if (currentpage && typeof currentpage === "function") {
    currentpage = currentpage(
      currentRoute?.handle?.data || parentRoute?.handle?.data
    );
  }

  const menu: Menu[] = data.menu;
  const routeMenu: Menu[] = currentRoute.data?.routeMenu;

  return (
    <SidebarProvider>
      <AdminSidebar />
      <PageLayout className="bg-gray-100">
        <PageLayoutHeader position={"sticky"} className="bg-white">
          <PageLayoutHeaderItem spacing={"compact"} className="">
            <div className="flex w-full items-center justify-between space-x-2">
              <div className="flex flex-row items-center gap-2 text-lg text-center font-medium sm:text-sm md:gap-6">
                <SidebarTrigger />

                <Link to="">
                  <h1 className="text-[24px] font-bold tracking-tight">
                    {data.appName}
                  </h1>
                </Link>
                {/* <Navbar menu={menu} /> */}
              </div>

              <HeaderIcons user={data.user} />
            </div>
          </PageLayoutHeaderItem>

          <PageLayoutHeaderItem className="border-t">
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </PageLayoutHeaderItem>
        </PageLayoutHeader>

        <PageLayoutContent>
          <h1 className="text-3xl font-bold text-gray-900 p-4">
            {currentpage || "Dashboard"}
          </h1>

          <Outlet context={{ user: data.user }} />
        </PageLayoutContent>
      </PageLayout>
    </SidebarProvider>
  );
}

// export const shouldRevalidate: ShouldRevalidateFunction = (props) => {
//   let { defaultShouldRevalidate, formAction } = props;

//   if (alert && formAction?.includes("settings")) {
//     alert(JSON.stringify(formAction, null, 2));
//     return true;
//   }

//   return defaultShouldRevalidate;
// };

/*

import {
  Package2,
  Boxes,
  Box,
  Receipt,
  CreditCard,
  Users,
  Settings,
  LifeBuoy,
  NewspaperIcon,
} from "lucide-react";

export const handle = {
  menu: [
    {
      id: "default",
      label: "Dashboard",
      path: "overview",
      icon: Package2,
    },
    {
      id: "orders",
      label: "Orders",
      path: "orders",
      icon: Package2,
    },
    {
      id: "subscriptions",
      label: "Subscription",
      path: "subscriptions",
      icon: Boxes,
    },
    {
      id: "products",
      label: "Products",
      path: "products",
      icon: Box,
    },
    {
      id: "invoice",
      label: "Invoice",
      path: "invoice",
      icon: Receipt,
    },
    {
      id: "transactions",
      label: "Transactions",
      path: "transactions",
      icon: CreditCard,
    },
    {
      id: "users",
      label: "Users",
      path: "transactions",
      icon: Users,
    },

    {
      id: "settings",
      label: "Settings",
      path: "settings",
      icon: Settings,
    },
    {
      id: "support",
      label: "Support",
      path: "support",
      icon: LifeBuoy,
    },
    {
      id: "blog",
      label: "Blog",
      icon: NewspaperIcon,
    },
  ],
};
*/
