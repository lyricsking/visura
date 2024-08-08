export type TicketModel = Model<ITicket>;

const ticketSchema = new Schema<ITicket, TicketModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: Object.values(TicketPriority), default: 'medium' },
  status: { type: String, enum: Object.values(TicketStatus), default: 'queue' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Ticket: TicketModel = model<ITicket, TicketModel>('Ticket', ticketSchema);

export default Ticket;
