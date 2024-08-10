import { IUserProfile } from "~/User/types/user-profile.type";

export interface AuthUser {
  id: string;
  email: string;
  profile?: IUserProfile;
}
