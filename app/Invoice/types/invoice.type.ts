import { Types } from 'mongoose';

export interface IInvoiceItem {
  product: Types.ObjectId;
  name: string;
  quantity: number;
}

const InvoiceStatus = {
  "Unpaid": "unpaid",
  "Paid": "paid",
  "Overdue": "overdue",
} as const;
type InvoiceStatus = typeof InvoiceStatus[keyof typeof InvoiceStatus];

export interface IInvoice {
  _id: Types.ObjectId;
  subscriptionId: Types.ObjectId;
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  customer: {
    name: string;
    address: Types.ObjectId;
    email: string;
    phone: string;
  };
  items: IInvoiceItem[];
  subTotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus
}
