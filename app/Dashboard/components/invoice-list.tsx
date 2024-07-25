import { Link } from '@remix-run/react';

interface Invoice {
  id: string;
  dueDate: string;
  amount: string;
  status: string;
}

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Invoices</h2>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id} className="mb-2">
            <Link to={`/invoices/${invoice.id}`} className="text-blue-500 underline">
              Invoice ID: {invoice.id}
            </Link>
            <p>Due Date: {invoice.dueDate}</p>
            <p>Amount: {invoice.amount}</p>
            <p>Status: {invoice.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
