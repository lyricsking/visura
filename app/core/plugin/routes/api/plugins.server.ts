import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { PluginModel } from "../../models/plugin.model";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import { IPlugin } from "../../types/plugin";
import { handleResponse } from "~/core/utils/helpers";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const isActive = url.searchParams.get("isActive") === "true";

  const query: { isActive?: boolean } = {};

  if (isActive) query.isActive = isActive;

  let response: DBReponse<IPlugin[] | null> = await handleDbResult(
    PluginModel.find(query)
  );

  return handleResponse<IPlugin[] | null>({
    ...response,
    statusCode: 200,
  });
};

export const action = ({}: ActionFunctionArgs) => {};
