import mongoose, {
  Schema,
  model,
  Document,
  Types,
  Model,
  models,
} from "mongoose";
import { IStaff, StaffRole } from "../types/staff.type";

export type StaffModel = Model<IStaff>;
const staffSchema = new Schema<IStaff, StaffModel>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: {
    type: String,
    enum: Object.values(StaffRole),
    required: true,
  },
  isAvailable: { type: Boolean, default: true },
  assignedTickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
});

const Staff: StaffModel =
  mongoose.models.Staff || model<IStaff, StaffModel>("Staff", staffSchema);

export default Staff;
