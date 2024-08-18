import { IUserProfile } from "~/User/types/user-profile.type";

export interface AuthUser {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  photo?: string;
  type?: string;
  role?: string;
}
