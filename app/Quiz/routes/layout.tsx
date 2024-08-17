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
  return (
    <PageLayout className="bg-gray-100 max-h-screen overflow-y-auto no-scrollbar">
      <PageLayoutContent>
        <Outlet />
      </PageLayoutContent>
    </PageLayout>
  );
}
