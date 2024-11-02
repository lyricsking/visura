import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { OptionModel } from "../../models/option.server";
import { getUserFromSession } from "~/core/user/server/user.server";
import formDataToObject from "~/core/utils/form-data-to-object";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import { UpdateWriteOpResult } from "mongoose";
import { handleResponse } from "~/core/utils/helpers";
import { IPlugin } from "~/core/plugin/types/plugin";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const name = url.searchParams.get("name");

  const query: { name?: string } = {};

  if (name) query.name = name;

  let response: DBReponse<IPlugin[] | null> = await handleDbResult(
    OptionModel.find(query)
  );

  return handleResponse<IPlugin[] | null>({
    ...response,
    statusCode: 200,
  });
};

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
