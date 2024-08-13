import mongoose, { Model, Schema, model } from "mongoose";
import { ITicket, TicketPriority, TicketStatus } from "../types/ticket.type";
import { models } from "mongoose";

export type TicketModel = Model<ITicket>;

const ticketSchema = new Schema<ITicket, TicketModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
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
