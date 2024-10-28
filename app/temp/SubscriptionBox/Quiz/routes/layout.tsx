import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, json, useLoaderData } from "@remix-run/react";
import { getUserFromSession } from "~/core/auth/server/auth.server";
import Button from "~/components/button";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";

export default function Layout() {
  const data = useLoaderData<typeof loader>();

  return (
    <PageLayout className="bg-gray-100 max-h-screen overflow-y-auto no-scrollbar">
      <PageLayoutContent>
        <Outlet context={{ user: data.user }} />
      </PageLayoutContent>
    </PageLayout>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the cache user object from session, could be undefined or IHydrated user.
  let user = await getUserFromSession(request);

  // Return user object if provided.
  return json({ ...(user && { user }) });
};
