import { HydratedDocument, Require_id } from "mongoose";
import { IUserProfile } from "~/User/types/user-profile.type";
import { IUser } from "~/User/types/user.types";

export type SettingsType = {
  profile?: Require_id<IUserProfile>;
  user?: Require_id<IUser>;
};