import { AuthUser } from "~/Auth/types/auth-user.type";
import { IHydratedUser, UserModel } from "~/User/models/user.model";
import { IUser } from "~/User/types/user.types";

export type SettingsType = {
  user: IHydratedUser;
};
