import mongoose, { Schema, Document } from 'mongoose';
import { IInvoice, IInvoiceItem } from '../types/invoice.type.ts'; 

// Define the InvoiceItem schema
const InvoiceItemSchema: Schema = new Schema<IInvoiceItem>({
  _id: false,
  product: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export type InvoiceModel = Model<IInvoice>
// Define the Invoice schema
const InvoiceSchema: Schema = new Schema<IInvoice, InvoiceModel>({
  subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', required: true },
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  customer: {
    name: { type: String, required: true },
    address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [InvoiceItemSchema],  // Embed InvoiceItem schema
  subTotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: Object.values(InvoiceStatus), required: true },
});

// Define the Invoice model
const Invoice: InvoiceModel = mongoose.models.Invoice || mongoose.model<IInvoice, InvoiceModel>('Invoice', InvoiceSchema);

export default Invoice;
