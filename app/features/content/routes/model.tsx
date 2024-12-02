import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { paginate } from "~/shared/utils/http";
import { logger } from "~/shared/utils/logger";
import { ContentType } from "../models/content.server";
import { createDynamicModel } from "../utils/model-generator";
import { PageModel } from "~/features/page/models/page.server";
import { z } from "zod";

const createPageSchema = z.object({});
const updatePageSchema = createPageSchema.partial();

export async function action({ params, request }: ActionFunctionArgs) {
  const { model } = params;

  // Fetch the content type definition
  const contentType = await ContentType.findOne({ modelName: model });
  if (!contentType) {
    return Response.json({ error: "Content type not found" }, { status: 404 });
  }
  // get the dynamic model and create a new record
  const DynamicModel = createDynamicModel(
    contentType.modelName,
    contentType.fields
  );

  const requestData = await request.json();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const method = request.method.toUpperCase();
    switch (method) {
      case "POST": {
        const parsedData = createPageSchema.safeParse(requestData);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const newRecord = new PageModel(parsedData.data);
        await newRecord.save();

        return Response.json(newRecord, { status: 201 });
      }
      case "PUT": {
        if (!id)
          return Response.json(
            { error: "ID is requuired for update" },
            { status: 400 }
          );

        const parsedData = updatePageSchema.safeParse(requestData);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const updatedRecord = await PageModel.findByIdAndUpdate(
          id,
          parsedData.data,
          { new: true }
        );
        if (!updatedRecord)
          return Response.json({ error: "Page not found" }, { status: 404 });
        return Response.json({ data: updatedRecord });
      }
      case "DELETE": {
        if (!id)
          return Response.json(
            { error: "ID is required for deletion" },
            { status: 400 }
          );
        const deletedRecord = await PageModel.findByIdAndDelete(id);
        if (!deletedRecord)
          return Response.json({ error: "Page not found" }, { status: 404 });
        return Response.json({ message: "Page deleted successfully" });
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
  const { model } = params;

  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const fields = url.searchParams.get("fields");

  //
  const query: Record<string, any> = {};

  const projection = fields
    ? fields.split(",").reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    : null;

  try {
    if (model) {
      const contentType = await ContentType.findOne({ modelName: model });
      if (!contentType) {
        return Response.json(
          { error: "Content type not found" },
          { status: 404 }
        );
      }
      // get the dynamic model and  fetch data
      const DynamicModel = createDynamicModel(
        contentType.modelName,
        contentType.fields
      );

      if (id) {
        const data = await DynamicModel.findById(id);
        if (!data) {
          return Response.json(
            { error: "Content type not found" },
            { status: 404 }
          );
        }
        return Response.json({ data: data });
      } else {
        const result = await paginate(
          DynamicModel,
          query,
          projection,
          page,
          limit
        );
        return Response.json(result);
      }
    }
  } catch (error) {
    logger(error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
