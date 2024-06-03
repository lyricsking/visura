import { Link, Outlet, json, useMatches } from "@remix-run/react";

export const handle = {
  //breadcrumb: () => <Link to="/dashboard/pages">Pages</Link>,
};

export default function Layout() {
  const routesMatch = useMatches();

  let pageName = "None";
  const currentRoute = routesMatch[routesMatch.length - 1];
  if (currentRoute && currentRoute.handle) {
    const handle: any = currentRoute.handle;
    if (handle["pageName"]) {
      pageName = handle["pageName"];
    }
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-[20px] font-bold text-start tracking-tight pb-[20px]">
        {pageName}
      </h3>
      <Outlet />
    </div>
  );
}
