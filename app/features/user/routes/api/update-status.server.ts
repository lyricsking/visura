import { ActionFunctionArgs, json } from "react-router";
import formDataToObject from "~/shared/utils/form-data-to-object";
import { DBReponse, handleDbResult } from "~/shared/utils/mongoose";
import { getUserFromSession } from "../../server/user.server";
import { handleResponse } from "~/shared/utils/helpers";
import User, { IHydratedUser } from "../../models/user.model";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUserFromSession(request);

  let userId = user?.id;

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const { _userId } = formObject;

  let response: DBReponse<IHydratedUser | null> = await handleDbResult(
    User.findByIdAndUpdate(userId, { isActive: false })
  );

  return handleResponse<IHydratedUser | null>({ ...response, statusCode: 200 });
};
