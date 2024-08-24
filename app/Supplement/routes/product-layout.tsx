import { Link, Outlet } from "@remix-run/react";

export const handle = {
  breadcrumb: {
    id: "products",
    label: "Products",
  },
};

export default function Products() {
  return (
    <div className="flex flex-col flex-1 items-start gap-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-7xl items-start bg-white rounded-md p-4 md:p-8 gap-4 md:grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr] overflow-x-auto">
        <nav className="grid grid-flow-col auto-cols-auto md:grid-flow-row md:auto-rows-auto gap-4 text-sm overflow-x-auto">
          <Link to="#" className="font-semibold text-primary">
            General
          </Link>
          <Link to="#">Security</Link>
          <Link to="#">Integrations</Link>
          <Link to="#">Support</Link>
          <Link to="#">Organizations</Link>
          <Link to="#">Advanced</Link>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}
