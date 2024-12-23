import { ActionFunctionArgs, json } from "react-router";
import formDataToObject from "~/shared/utils/form-data-to-object";
import { DBReponse, handleDbResult } from "~/shared/utils/mongoose";
import UserMeta, { IUserMeta } from "../../models/user-meta.model";
import { getUserFromSession } from "../../server/user.server";

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
