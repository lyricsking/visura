import { ActionFunctionArgs, json } from "@remix-run/node";
import formDataToObject from "~/core/utils/form-data-to-object";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import UserMeta, { IUserMeta } from "../models/user-meta.model";
import { getUserFromSession } from "../server/user.server";
import User, { IHydratedUser, IUser } from "../models/user.model";
import { handleResponse } from "~/core/utils/helpers";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUserFromSession(request);

  let userId = user?.id;

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const { _userId, currentPassword, newPassword } = formObject;

  let response: DBReponse<IHydratedUser | undefined> = await handleDbResult(
    User.findById(userId).then((user) => {
      if (user) {
        const hasPassword = user.hasPassword();

        if (hasPassword) {
          user.isValidPassword(currentPassword).then((isValidPassword) => {
            if (!isValidPassword) {
              throw new Error("Invalid password");
            }
          });
        }

        user.password = newPassword;
        return user.save();
      }
    })
  );
  
  return handleResponse<IHydratedUser | null>({ ...response, statusCode: 200 });
};
