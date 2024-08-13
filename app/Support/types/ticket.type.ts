import { Types } from "mongoose";

export const TicketPriority = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const;
export type TicketPriority =
  (typeof TicketPriority)[keyof typeof TicketPriority];

export const TicketStatus = {
  queue: "Queue",
  awaiting_support: "Awaiting Support",
  awaiting_customer: "Awaiting Customer",
  resolved: "Resolved",
  closed: "Closed",
} as const;
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export interface ITicket {
  _id: Types.ObjectId;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
}
