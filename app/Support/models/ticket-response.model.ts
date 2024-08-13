import mongoose, { Model, Schema, model } from "mongoose";
import { ITicketResponse } from "../types/ticket-response.type";

export type TicketResponseModel = Model<ITicketResponse>;

const responseSchema = new Schema<ITicketResponse, TicketResponseModel>({
  ticket: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TicketResponse: TicketResponseModel =
  mongoose.models.TicketResponse ||
  model<ITicketResponse, TicketResponseModel>("TicketResponse", responseSchema);

export default TicketResponse;
