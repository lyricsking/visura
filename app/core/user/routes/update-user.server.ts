import { ActionFunctionArgs, json } from "@remix-run/node";
import { getUserFromSession } from "~/core/auth/server/auth.server";
import formDataToObject from "~/core/utils/form-data-to-object";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import UserMeta from "../models/user-meta.model";
import { IUserMeta } from "../types/user-meta.type";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUserFromSession(request);

  let userId = user?.id;

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const [firstName, lastName] = formObject["name"].split(" ");

  let response: DBReponse<IUserMeta | null> = await handleDbResult(
    UserMeta.findOneAndUpdate(
      { userId },
      { firstName, lastName },
      {
        new: true,
      }
    ).exec()
  );

  return json(response);
};
