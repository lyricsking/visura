import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { IOption, OptionModel } from "../../models/option.model";
import UserMeta, { IUserMeta } from "~/core/user/models/user-meta.model";
import { getUserFromSession } from "~/core/user/server/user.server";
import formDataToObject from "~/core/utils/form-data-to-object";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import { UpdateWriteOpResult } from "mongoose";
import { handleResponse } from "~/core/utils/helpers";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUserFromSession(request);

  let userId = user?.id;

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const name = formObject["name"];
  const value = formObject["value"];

  let response: DBReponse<UpdateWriteOpResult | null> = await handleDbResult(
    OptionModel.updateOne({ name, value: value }).exec()
  );

  return handleResponse<UpdateWriteOpResult | null>({
    ...response,
    statusCode: 200,
  });
};
