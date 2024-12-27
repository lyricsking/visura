import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { IPlugin } from "../../shared/types/plugin";
import { handleResponse } from "~/shared/utils/helpers";
import { DBReponse, handleDbResult } from "~/shared/utils/mongoose";
import { PluginModel } from "../models/plugin.model";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let response: DBReponse<IPlugin[] | null>;

  if (process.env.NODE_ENV !== "production") {
    const blogPlugin = new PluginModel({
      name: "blog",
      description: "Blog description",
      path: "/app/plugins/blog/index",
      isActive: true,
      settings: {
        routes: [],
      },
      version: "0.0.1",
    });

    response = { data: [blogPlugin] };
  } else {
    const url = new URL(request.url);

    const isActive = url.searchParams.get("isActive") === "true";

    const query: { isActive?: boolean } = {};

    if (isActive) query.isActive = isActive;

    response = await handleDbResult(PluginModel.find(query));
  }

  return json(response);
};

export const action = ({}: ActionFunctionArgs) => {};
