import { LoaderFunction, json } from "react-router";
import { Outlet, useLoaderData, Link } from "react-router";
import InvoiceList from "~/plugins/SubscriptionBox/Invoice/components/invoice-list";

// Mock data for demonstration
const mockData = {
  invoices: [
    { id: "301", dueDate: "2024-08-01", amount: "$29.99", status: "Pending" },
    { id: "302", dueDate: "2024-08-15", amount: "$19.99", status: "Paid" },
  ],
};

export const handle = {
  pageName: "Transactions",
  breadcrumb: {
    id: "transactions",
    label: "Transactions",
  },
};

export default function Invoices() {
  const data = useLoaderData<typeof mockData>();

  return (
    <div className="p-4 space-y-8">
      <InvoiceList invoices={data.invoices} />
      <Outlet />
    </div>
  );
}

export const loader: LoaderFunction = async () => {
  // Replace with actual data fetching logic
  return json(mockData);
};
