import { Model, Schema, model, models } from "mongoose";
import { IActivityLog } from "../types/activity-log.type";

export type ActivityLogModel = Model<IActivityLog>;
const logSchema = new Schema<IActivityLog, ActivityLogModel>({
  action: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  staff: { type: Schema.Types.ObjectId, ref: "Staff" },
  subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
  ticket: { type: Schema.Types.ObjectId, ref: "Ticket" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const ActivityLog: ActivityLogModel =
  models.ActivityLog ||
  model<IActivityLog, ActivityLogModel>("ActivityLog", logSchema);

export default ActivityLog;
