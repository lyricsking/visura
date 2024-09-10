import { Types } from 'mongoose';

export const UserType = {
  customer:'customer',
  staff: "staff"
} as const
export type UserType = (typeof UserType)[keyof typeof UserType];

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  hasPassword: boolean;
  type: UserType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
