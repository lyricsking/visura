import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import pkg from "../../../package.json";
import Breadcrumb from "~/components/breadcrumb";
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  getCacheUser,
  isAuthenticated,
  setCacheUser,
} from "~/Auth/server/auth.server";
import { getSubdomain } from "~/utils/domain";
import { DrawerMenu } from "~/Dashboard/components/sidebar";
import HeaderIcons from "../components/header-icons";
import { isAuthUser } from "~/Auth/utils/helper";
import { findOrCreateUserProfiles } from "~/User/server/user.server";
import { commitSession } from "~/utils/session";
import { Package2 } from "lucide-react";

export const handle = {
  breadcrumb: {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
};

export default function Layout() {
  const data = useLoaderData<typeof loader>();

  const matches = useMatches();
  const currentRoute: any = matches.at(-1);

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

  let sidebarMenu;
  if (currentRoute.handle && currentRoute.handle.sidebarMenu) {
    sidebarMenu = currentRoute.handle.sidebarMenu(currentRoute.data);
  }

  return (
    <PageLayout className="bg-gray-100">
      <PageLayoutHeader position={"sticky"} className="bg-white">
        <PageLayoutHeaderItem spacing={"compact"} className="p-4">
          <Link to={"/dashboard"} replace className="flex-1 sm:flex-none">
            <h1 className="text-[28px] font-bold text-center tracking-tight">
              {pkg.name}.
            </h1>
          </Link>
          <nav className="hidden flex-col gap-6 text-lg font-medium sm:flex sm:flex-row sm:items-center sm:gap-5 sm:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Customers
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
        </PageLayoutHeaderItem>

        <PageLayoutHeaderItem className="border-t">
          {sidebarMenu && (
            <DrawerMenu
              menus={sidebarMenu}
              side={data.user.type === "customer" ? "right" : "left"}
            />
          )}
          <HeaderIcons profile={data.user.profile} />
        </PageLayoutHeaderItem>

        <PageLayoutHeaderItem className="border-t">
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </PageLayoutHeaderItem>
      </PageLayoutHeader>

      <PageLayoutContent className="gap-0">
        <h1 className="text-3xl font-bold text-gray-900 py-6 px-4 sm:px-6 lg:px-8">
          {currentRoute.handle.pageName}
        </h1>
        <div className="bg-white">
          <Outlet context={{ appname: pkg.name, user: data.user }} />
        </div>
      </PageLayoutContent>
    </PageLayout>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  // Get the authenticated user or redirects to auth page
  const authUser = await isAuthenticated(request);
  // check the subdomain we are accessing the page from, useed to manage staff users access.
  let subdomain = getSubdomain(request);
  // if the user has role access to the subdomain
  // Get the cache user object from session, could be undefined or IHydrated user.
  let user = await getCacheUser(request);
  // Initialize the headers object to cache the session if the user is undefined
  let headers: HeadersInit = {};
  // If the authUser object returned from authentication is of type AuthUser
  // (i.e user is authenticated) but the the cache user is null or undefined,
  // it means the cached user is invalidated, so we fetch a new object
  // from server and cache.
  if (isAuthUser(authUser) && !user) {
    // Cache invalidated, we fetch a new user object
    user = await findOrCreateUserProfiles({ email: authUser.email });
    // Cahe the new user object
    headers["Set-Cookie"] = await commitSession(
      await setCacheUser(request, user)
    );
  }

  // Return user object if provided.
  return json({ ...(user && { user }) }, { headers });
};

// export const shouldRevalidate: ShouldRevalidateFunction = (props) => {
//   let { defaultShouldRevalidate, formAction } = props;

//   if (alert && formAction?.includes("settings")) {
//     alert(JSON.stringify(formAction, null, 2));
//     return true;
//   }

//   return defaultShouldRevalidate;
// };
