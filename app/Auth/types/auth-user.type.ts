import { IUserProfile } from "~/User/types/user-profile.type";
import { UserType } from "~/User/types/user.types";

export interface AuthUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  type?: UserType;
  role?: string;
}
