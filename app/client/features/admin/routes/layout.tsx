import { LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  Link,
  Outlet,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import Breadcrumb from "~/client/components/breadcrumb";
import {
  PageLayout,
  PageLayoutHeader,
  PageLayoutHeaderItem,
  PageLayoutContent,
} from "~/client/components/ui/page.layout";
import { SidebarProvider, SidebarTrigger } from "~/client/components/sidebar";
import { APP_NAME } from "~/app";
import { Types } from "mongoose";
import { isAuthenticated } from "~/shared/auth/server/auth.server";
import { IUser } from "~/shared/types/user";

export const handle = {
  breadcrumb: {
    id: "dashboard",
    label: "Dashboard",
    path: "/administration",
  },
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let user: IUser | undefined;

  if (process.env.NODE_ENV != "production") {
    user = {
      _id: new Types.ObjectId(),
      firstName: "",
      lastName: "",
      email: "",
      type: "customer",
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } else {
    // Get the authenticated user or redirects to auth page
    const authRes = await isAuthenticated(request, true);

    // check the subdomain we are accessing the page from, useed to manage staff users access.
    // let subdomain = getSubdomain(request);
    // if the user has role access to the subdomain
    // Get the cache user object from session, could be undefined or IHydrated user.

    user = await getUserOrFetch(request, authRes!.email);
  }

  return json({ user });
};

export default function Layout() {
  const data = useLoaderData<typeof loader>();

  let user = data.user;

  const appName = useAppContext().config(APP_NAME);

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

  let pageName =
    currentRoute?.handle?.pageName || parentRoute?.handle?.pageName;
  if (pageName && typeof pageName === "function") {
    pageName = pageName(currentRoute?.data || parentRoute?.data);
  }

  return (
    <SidebarProvider>
      {/* Admin sidebar drawer */}
      <AdminSidebar />
      {/** PageLayout */}

      <PageLayout className="bg-gray-100">
        <PageLayoutHeader position={"sticky"} className="bg-white">
          <PageLayoutHeaderItem spacing={"compact"}>
            <div className="flex w-full items-center justify-between space-x-2">
              <div className="flex flex-row items-center gap-2 text-lg text-center font-medium sm:text-sm md:gap-6">
                {/** Sidebar Trigger */}
                <SidebarTrigger />
                <Link to="/administration">
                  <h1 className="text-[24px] font-bold tracking-tight">
                    {appName}
                  </h1>
                </Link>
                {/* <Navbar /> */}
              </div>

              <HeaderIcons user={user as any} />
            </div>
          </PageLayoutHeaderItem>

          <PageLayoutHeaderItem className="border-t">
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </PageLayoutHeaderItem>
        </PageLayoutHeader>

        <PageLayoutContent>
          <h1 className="text-3xl font-bold text-gray-900 p-4">
            {pageName || "Dashboard"}
          </h1>

          <div className="px-4">
            <Outlet context={{ user: user }} />
          </div>
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
