import { ActionFunctionArgs, json } from "@remix-run/node";
import { getUserFromSession } from "~/core/auth/server/auth.server";
import formDataToObject from "~/utils/form-data-to-object";
import { DBReponse, handleDbResult } from "~/utils/mongoose";
import UserProfile from "../models/user-profile.model";
import { IUserProfile } from "../types/user-profile.type";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUserFromSession(request);

  let userId = user?.id;

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const [firstName, lastName] = formObject["name"].split(" ");

  let response: DBReponse<IUserProfile | null> = await handleDbResult(
    UserProfile.findOneAndUpdate(
      { userId },
      { firstName, lastName },
      {
        new: true,
      }
    ).exec()
  );

  return json(response);
};
