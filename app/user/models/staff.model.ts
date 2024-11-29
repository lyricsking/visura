import mongoose, {
  Schema,
  model,
  Document,
  Types,
  Model,
  models,
} from "mongoose";

export const StaffRole = {
  support: "support",
  technical: "technical",
  admin: "admin",
} as const;
export type StaffRole = (typeof StaffRole)[keyof typeof StaffRole];

export interface IStaff {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  role: StaffRole;
  isAvailable: boolean; // Availability status
  assignedTickets: Types.ObjectId[];
}

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
