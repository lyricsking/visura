import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  roles: ('user' | 'admin' | 'support')[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
