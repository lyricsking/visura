export type TicketResponseModel = Model<ITicketResponse>;

const responseSchema = new Schema<ITicketResponse, TicketResponseModel>({
  ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TicketResponse: TicketResponseModel = models.TicketResponse || model<ITicketResponse, TicketResponseModel>('TicketResponse', ticketSchema);

export default TicketResponse;
