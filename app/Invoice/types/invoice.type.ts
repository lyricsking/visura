import { Types } from 'mongoose';

export interface IInvoiceItem {
  productId: Types.ObjectId;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface IInvoice {
  _id: Types.ObjectId;
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  customer: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: IInvoiceItem[];
  subTotal: number;
  tax: number;
  total: number;
  status: 'unpaid' | 'paid' | 'overdue';
}
