import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { UpdateWriteOpResult } from "mongoose";
import { APP_NAME } from "~/app";
import { DISPLAY_OPTION_KEY, IOption } from "~/shared/types/option";
import { handleResponse } from "~/shared/utils/helpers";
import { DBReponse, handleDbResult } from "~/shared/utils/mongoose";
import { OptionModel } from "../models/option.server";
import { paginate } from "~/shared/utils/http";
import { logger } from "~/shared/utils/logger";
import { ContentType } from "../models/content";
import { isAuthenticated } from "~/shared/auth/server/auth.server";
import { z } from "zod";

const createOptionDataSchema = z.object({
  name: z.string(),
  value: z.any(),
  autoload: z.boolean().optional(),
});

const updateOptionDataSchema = createOptionDataSchema.partial();

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const user = await isAuthenticated(request);

  let userId = user?.id;

  const body = await request.json();

  const { name } = params;

  try {
    const method = request.method.toUpperCase();
    switch (method) {
      case "POST": {
        const parsedData = createOptionDataSchema.safeParse(body);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const option = new OptionModel(parsedData.data);

        await option.save();

        return Response.json({
          message: "Option added",
          data: option,
        });
      }
      case "PUT": {
        if (!name)
          return Response.json(
            { error: "Option key was notprovided." },
            { status: 400 }
          );

        const parsedData = updateOptionDataSchema.safeParse(body);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const updatedRecord = await OptionModel.findOneAndUpdate(
          { name },
          parsedData.data,
          { new: true }
        );

        if (!updatedRecord) {
          return Response.json(
            { error: `No Option exists for: ${name}` },
            { status: 404 }
          );
        }

        return Response.json({ data: updatedRecord });
      }
      case "DELETE": {
        if (!name)
          return Response.json(
            { error: "Type of content to delete must be provided." },
            { status: 400 }
          );
        const deletedRecord = await ContentType.findOneAndDelete({ name });
        if (!deletedRecord)
          return Response.json(
            {
              error: `Record not found for option: "${name}"`,
            },
            { status: 404 }
          );
        return Response.json({
          message: `Option "${name}" was deleted successfully`,
        });
      }
      default:
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    logger(error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const fields = url.searchParams.get("fields");

  //
  const query: Record<string, any> = {
    // ...(name && { name }),
  };

  const projection = fields
    ? fields.split(",").reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    : null;

  const { name } = params;

  try {
    if (name) {
      const option = await OptionModel.findOne({ name });
      if (!option) {
        return Response.json(
          { error: `Can not find any option with the name: ${name}.` },
          { status: 404 }
        );
      }
      return Response.json({ data: option });
    } else {
      const result = await paginate(
        OptionModel,
        query,
        projection,
        page,
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
