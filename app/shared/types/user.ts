import { Types } from "mongoose";

export const UserType = {
  customer: "customer",
  staff: "staff",
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photo?: string;
  password?: string;
  type: UserType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
