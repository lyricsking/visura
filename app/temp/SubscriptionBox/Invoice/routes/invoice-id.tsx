import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import InvoiceDetails from "~/plugins/SubscriptionBox/Invoice/components/invoice-detail";

// Mock data for demonstration
const mockData = {
  invoices: [
    {
      id: "301",
      dueDate: "2024-08-01",
      amount: "$29.99",
      status: "Pending",
      items: [
        { description: "Product A", amount: "$15.00" },
        { description: "Product B", amount: "$14.99" },
      ],
    },
    {
      id: "302",
      dueDate: "2024-08-15",
      amount: "$19.99",
      status: "Paid",
      items: [{ description: "Product C", amount: "$19.99" }],
    },
  ],
};

export const handle = {
  pageName: "Invoices",
};

export default function InvoiceId() {
  const invoice = useLoaderData<(typeof mockData.invoices)[0]>();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <InvoiceDetails invoice={invoice} />
    </div>
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const invoice = mockData.invoices.find((inv) => inv.id === params.id);
  if (!invoice) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(invoice);
};
