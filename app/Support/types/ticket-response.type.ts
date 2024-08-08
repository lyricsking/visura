export interface ITicketResponse {
  _id: Types.ObjectId;
  ticket: Schema.Types.ObjectId; // Reference to the Ticket
  userId: Schema.Types.ObjectId; // Reference to the Sender
  message: string;
  createdAt: Date;
}
