import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { PluginModel } from "../models/plugin.model";
import { paginate } from "~/core/utils/http";
import { logger } from "~/core/utils/logger";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const { id } = params;

  const isActive = url.searchParams.get("isActive");
  const plugin = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const fields = url.searchParams.get("fields");

  const query: Record<string, any> = {
    ...(isActive && { isActive: isActive === "true" }),
  };

  const projection = fields
    ? fields.split(",").reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    : null;

  try {
    if (id) {
      const data = await PluginModel.findById(id);
      if (!data) {
        return Response.json({ error: "Plugin not found" }, { status: 404 });
      }
      return Response.json({ data: data });
    } else {
      const result = await paginate(
        PluginModel,
        query,
        projection,
        plugin,
        limit
      );
      return Response.json(result);
    }
  } catch (error) {
    logger(error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};

export const action = ({}: ActionFunctionArgs) => {};
