import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Outlet } from "@remix-run/react";
import Button from "~/components/button";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";

export default function Layout() {
  const {data}=useLoaderData()
  return (
    <PageLayout className="bg-gray-100 max-h-screen overflow-y-auto no-scrollbar">
      <PageLayoutContent>
        <Outlet />
      </PageLayoutContent>
    </PageLayout>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  // Get the cache user object from session, could be undefined or IHydrated user.
  let user = await getCacheUser(request);

  // Return user object if provided.
  return json({ ...(user && { user }) });
};
