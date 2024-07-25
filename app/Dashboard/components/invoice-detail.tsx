import { Link } from "@remix-run/react";

interface InvoiceDetailsProps {
  id: string;
  dueDate: string;
  amount: string;
  status: string;
  items: {
    description: string;
    amount: string;
  }[];
}

export default function InvoiceDetails({
  invoice,
}: {
  invoice: InvoiceDetailsProps;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Invoice Details</h2>
      <p>Invoice ID: {invoice.id}</p>
      <p>Due Date: {invoice.dueDate}</p>
      <p>Amount: {invoice.amount}</p>
      <p>Status: {invoice.status}</p>

      <h3 className="text-md font-medium mt-4">Items</h3>
      <ul>
        {invoice.items.map((item, index) => (
          <li key={index} className="mb-2">
            <p>Description: {item.description}</p>
            <p>Amount: {item.amount}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Link to="/invoices" className="text-blue-500 underline">
          Back to Invoices
        </Link>
      </div>
    </div>
  );
}
