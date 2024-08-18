import { Schema, model, Document, Types, Model, models } from "mongoose";

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
