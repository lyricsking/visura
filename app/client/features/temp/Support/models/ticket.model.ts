import mongoose, { Model, Schema, model } from "mongoose";
import { ITicket, TicketPriority, TicketStatus } from "../types/ticket.type";

export type TicketModel = Model<ITicket>;

const ticketSchema = new Schema<ITicket, TicketModel>({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  priority: {
    type: String,
    enum: Object.values(TicketPriority),
    default: "Medium",
  },
  status: { type: String, enum: Object.values(TicketStatus), default: "Queue" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Ticket: TicketModel =
  mongoose.models.Ticket || model<ITicket, TicketModel>("Ticket", ticketSchema);
export default Ticket;
