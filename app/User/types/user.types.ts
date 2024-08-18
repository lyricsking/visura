import { Types } from 'mongoose';

export const UserRoles = {
  user:'user',
  staff: "staff"
} as const
export type UserRoles = typeof UserRoles[keyof typeof UserRoles];

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  hasPassword: boolean;
  roles: UserRoles[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
