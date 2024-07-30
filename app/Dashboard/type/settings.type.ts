import { IUserProfile } from "~/User/types/user-profile.type";
import { IUser } from "~/User/types/user.types";

export type SettingsType = {
  profile: IUserProfile,
  user: IUser,
}