import { IUserProfile } from "~/User/types/user-profile.type";
import { UserType } from "~/User/types/user.types";

export interface AuthUser {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  photo?: string;
  type?: UserType;
  role?: string;
}
