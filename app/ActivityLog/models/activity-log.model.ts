export type LogModel = Model < ILog >
  const logSchema = new Schema < ILog,
    LogModel > ({
      action: { type: String, required: true },
      details: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      order: { type: Schema.Types.ObjectId, ref: 'Order' },
      staff: { type: Schema.Types.ObjectId, ref: 'Staff' },
      subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
      ticket: { type: Schema.Types.ObjectId, ref: 'User' },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    });

const Log: LogModel = models.Log || model < ILog,
  LogModel > ('Log', logSchema);

export default Log;