import { ActionFunctionArgs, data, LoaderFunctionArgs } from "@remix-run/node";
import { logger } from "~/shared/utils/logger";
import { paginate } from "~/shared/utils/http";
import { z } from "zod";
import { ContentType } from "../models/content";

const fieldsSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean(),
});

const createContentDataSchema = z.object({
  name: z.string(),
  fields: z.array(fieldsSchema),
});

const updateContentDataSchema = createContentDataSchema.partial();

export async function action({ params, request }: ActionFunctionArgs) {
  const url = new URL(request.url);

  const { type } = params;

  const body = await request.json();

  try {
    const method = request.method.toUpperCase();
    switch (method) {
      case "POST": {
        const parsedData = createContentDataSchema.safeParse(body);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const contentType = new ContentType(parsedData.data);

        await contentType.save();

        return Response.json({
          message: "Content type created",
          data: contentType,
        });
      }
      case "PUT": {
        if (!type)
          return Response.json(
            { error: "Type of content to update must be provided." },
            { status: 400 }
          );

        const parsedData = updateContentDataSchema.safeParse(body);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const updatedRecord = await ContentType.findOneAndUpdate(
          { name: type },
          parsedData.data,
          { new: true }
        );

        if (!updatedRecord) {
          return Response.json(
            { error: `No Content exists for the type: ${type}` },
            { status: 404 }
          );
        }

        return Response.json({ data: updatedRecord });
      }
      case "DELETE": {
        if (!type)
          return Response.json(
            { error: "Type of content to delete must be provided." },
            { status: 400 }
          );
        const deletedRecord = await ContentType.findOneAndDelete({
          name: type,
        });
        if (!deletedRecord)
          return Response.json(
            {
              error: `Record not found for type: ${type}`,
            },
            { status: 404 }
          );
        return Response.json({
          message: `Content type: ${type} was deleted successfully`,
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
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const name = url.searchParams.get("model") || "";

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const fields = url.searchParams.get("fields");

  //
  const query: Record<string, any> = {
    ...(name && { name }),
  };

  const projection = fields
    ? fields.split(",").reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    : null;

  const { type } = params;

  try {
    if (type) {
      const contentType = await ContentType.findOne({ name: type });
      if (!contentType) {
        return Response.json(
          { error: `Content type:${type} not found.` },
          { status: 404 }
        );
      }
      return Response.json({ data: contentType });
    } else {
      const result = await paginate(
        ContentType,
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
}
