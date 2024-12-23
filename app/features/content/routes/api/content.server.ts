import { ActionFunctionArgs, data, LoaderFunctionArgs } from "@remix-run/node";
import { ContentType } from "../../models/content.server";
import { logger } from "~/shared/utils/logger";
import { paginate } from "~/shared/utils/http";
import { z } from "zod";

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

  const { id } = params;

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
        if (!id)
          return Response.json(
            { error: "ID is required for update record" },
            { status: 400 }
          );

        const parsedData = updateContentDataSchema.safeParse(body);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const updatedRecord = await ContentType.findByIdAndUpdate(
          id,
          parsedData.data,
          { new: true }
        );

        if (!updatedRecord) {
          return Response.json(
            { error: `No contentType exists for the id: ${id}` },
            { status: 404 }
          );
        }

        return Response.json({ data: updatedRecord });
      }
      case "DELETE": {
        if (!id)
          return Response.json(
            { error: "ID is required for deletion" },
            { status: 400 }
          );
        const deletedRecord = await ContentType.findByIdAndDelete(id);
        if (!deletedRecord)
          return Response.json(
            {
              error: `Record not found for id: ${id}`,
            },
            { status: 404 }
          );
        return Response.json({
          message: `Record with id: ${id} was deleted successfully`,
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

  const { id } = params;

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const fields = url.searchParams.get("fields");

  //
  const query: Record<string, any> = {};

  const projection = fields
    ? fields.split(",").reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    : null;

  try {
    if (id) {
      const contentType = await ContentType.findById(id);
      if (!contentType) {
        return Response.json(
          { error: `Content type with id:${id} not found.` },
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
