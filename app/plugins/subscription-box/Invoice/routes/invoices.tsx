import { LoaderFunction, json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "@remix-run/react";
import InvoiceList from "~/plugins/subscription-box/Invoice/components/invoice-list";

// Mock data for demonstration
const mockData = {
  invoices: [
    { id: "301", dueDate: "2024-08-01", amount: "$29.99", status: "Pending" },
    { id: "302", dueDate: "2024-08-15", amount: "$19.99", status: "Paid" },
  ],
};

export const handle = {
  pageName: "Invoices",
  breadcrumb: {
    id: "invoices",
    label: "Invoices",
    path: "/dashboard/invoices",
  },
};

export default function Invoices() {
  const data = useLoaderData<typeof mockData>();

  const navigate = useNavigate();
  const params = useParams();

  const status = params["status"] || "pending";
  const onStatus = (newStatus: string) => {
    navigate(`/dashboard/orders/${newStatus}`);
  };

  const { sidebarMenuRef }: any = useOutletContext();
  if (sidebarMenuRef) {
    sidebarMenuRef.current = () => [
      {
        id: "pending",
        label: "Pending",
        url: "orders",
      },
      {
        id: "expired",
        label: "Processing",
        url: "orders/processing",
      },
      {
        id: "paid",
        label: "Processing",
        url: "invoices/paid",
      },
    ];
  }

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
