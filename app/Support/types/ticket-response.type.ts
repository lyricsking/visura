import { Types } from "mongoose";

export interface ITicketResponse {
  _id: Types.ObjectId;
  ticket: Types.ObjectId; // Reference to the Ticket
  userId: Types.ObjectId; // Reference to the Sender
  message: string;
  createdAt: Date;
}
