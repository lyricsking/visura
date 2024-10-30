import { ActionFunctionArgs, json } from "@remix-run/node";
import formDataToObject from "~/core/utils/form-data-to-object";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import UserMeta, { IUserMeta } from "../models/user-meta.model";
import { getUserFromSession } from "../server/user.server";
import User from "../models/user.model";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUserFromSession(request);

  let userId = user?.id;

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const { _userId, currentPassword, newPassword } = formObject;

  let response: DBReponse<IUserMeta | null> = await handleDbResult(
    User.findById(userId).then((user) => {
      if (user && user.hasPassword()) {
        return user
          .isValidPassword(currentPassword)
          .then((isValidPassword) => {
            if (!isValidPassword) {
              throw new
            }
          });
      } else {
        
      }
    })
  );

  return json(response);
};
