// models/Staff.ts
import { Schema, model, Document } from 'mongoose';

export const StaffRole = {
support: "support",
technical:"technical",
admin: "admin"
} as const;
export type StaffRole = typeof StaffRole[keyof typeof StaffRole];

interface IStaff {
_id: Types.ObjectId;
name: string;
email: string;
role: StaffRole;
isAvailable: boolean; // Availability status
}

export type StaffModel = Model<IStaff>
  const staffSchema = new Schema<IStaff, StaffModel>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['support', 'technical', 'manager'], required: true },
    isAvailable: { type: Boolean, default: true },
    });

    const Staff: StaffModel = models.Staff || model<IStaff, StaffModel>('Staff', staffSchema);

      export default Staff;