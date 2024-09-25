import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
} from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import Breadcrumb from "~/components/breadcrumb";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import {
  getUserFromSession,
  isAuthenticated,
  setUserToSession,
} from "~/core/auth/server/auth.server";
import { getSubdomain } from "~/utils/domain";
import { isAuthUser } from "~/core/auth/utils/helper";
import { findOrCreateUserProfiles } from "~/core/User/server/user.server";
import { Sidebar } from "~/components/ui/sidebar";
import config, { PluginSettingsType } from "~/config";
import { Navbar } from "~/components/ui/navbar";
import HeaderIcons from "~/plugins/dashboard/components/header-icons";
import dashboardPlugin from "..";
import { Menu } from "~/utils/menu";
import plugins from "~/plugins";

export const handle = {
  breadcrumb: {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
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

  const menu: Menu[] = [];
  Object.entries(config.plugins).forEach(([pluginName, pluginConfig]) => {
    if (pluginConfig.enabled) {
      const plugin = plugins[pluginName];

      if (plugin && plugin.dashboardMenu) {
        menu.push(...plugin.dashboardMenu);
      }
    }
  });

  return (
    <PageLayout className="bg-gray-100">
      <PageLayoutHeader position={"sticky"} className="bg-white">
        <PageLayoutHeaderItem spacing={"compact"} className="">
          <div className="flex w-full items-center justify-between space-x-2">
            <div className="flex flex-row items-center gap-2 text-lg text-center font-medium sm:text-sm md:gap-6">
              <Sidebar
                menu={menu}
                side={data.user.type === "customer" ? "right" : "left"}
              />
              <Link to={config.plugins[dashboardPlugin.name].settings.path}>
                <h1 className="text-[24px] font-bold tracking-tight">
                  {config.appName}
                </h1>
              </Link>
              <Navbar menu={menu} />
            </div>

            <HeaderIcons user={data.user} />
          </div>
        </PageLayoutHeaderItem>

        <PageLayoutHeaderItem className="border-t">
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </PageLayoutHeaderItem>
      </PageLayoutHeader>

      <PageLayoutContent>
        <h1 className="text-3xl font-bold text-gray-900 py-6 px-4 sm:px-6 lg:px-8">
          {currentRoute?.handle?.pageName ||
            parentRoute?.handle?.pageName ||
            "Dashboard"}
        </h1>

  <div className="w-full mx-auto sm:w-full grid px-4 sm:px-8">
      <div className="grid sm:border sm:rounded-md py-4 md:p-8 gap-4 md:grid-cols-[150px_1fr] md:gap-6 lg:grid-cols-[280px_1fr]">
        <div className="grid bg-white rounded-md">
          <nav className="max-w-xl h-min grid items-center grid-flow-col auto-cols-auto md:grid-flow-row md:auto-rows-auto gap-4 py-2 px-4 md:py-12 md:px-6 text-sm">
            <ScrollArea className="whitespace-nowrap" type="scroll">
              <div className="grid grid-flow-col auto-cols-auto md:grid-flow-row md:auto-rows-auto items-center gap-4 divide-x md:divide-x-0">
                {submenu.map((item: any) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      cn("w-full text-center", {
                        "font-semibold text-primary bg-slate-200 p-2 rounded-md":
                          isActive,
                      })
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </nav>
        </div>

        <ScrollArea className="h-screen w-full" type="auto">
          <div className="w-full py-8 px-4 md:py-12 md:px-6 bg-white rounded-md">  
        <Outlet context={{ user: data.user }} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  

      </PageLayoutContent>
    </PageLayout>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
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
    user = await findOrCreateUserProfiles({ email: auth.email });

    await setUserToSession(request, user);
  }

  // Return user object if provided.
  return json({ ...(user && { user }) });
};

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