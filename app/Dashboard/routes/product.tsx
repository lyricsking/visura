import { Link, Outlet } from "@remix-run/react";

export const handle = {
  breadcrumb: {
    id: "products",
    label: "Products",
  },
};

export default function Products() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto items-start gap-4 md:gap-8">
      <div className="mx-auto grid items-start bg-white border rounded-md p-4 md:p-8 gap-4 md:grid-cols-[150px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] overflow-x-auto">
        <nav className="mx-auto grid grid-flow-col auto-cols-auto md:grid-flow-row md:auto-rows-auto gap-4 p-4 text-sm overflow-x-auto">
          <Link to="#" className="font-semibold text-primary">
            General
          </Link>
          <Link to="#">Security</Link>
          <Link to="#">Integrations</Link>
          <Link to="#">Support</Link>
          <Link to="#">Organizations</Link>
          <Link to="#">Advanced</Link>
        </nav>
        <div className="mx-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
