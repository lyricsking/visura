import { Schema, model, Document, Types, Model, models } from "mongoose";
import { IStaff, StaffRole } from "../types/staff.type";

export type StaffModel = Model<IStaff>;
const staffSchema = new Schema<IStaff, StaffModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: Object.values(StaffRole),
    required: true,
  },
  isAvailable: { type: Boolean, default: true },
});

const Staff: StaffModel =
  models.Staff || model<IStaff, StaffModel>("Staff", staffSchema);

export default Staff;
