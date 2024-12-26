import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { paginate } from "~/shared/utils/http";
import { logger } from "~/shared/utils/logger";
import { createDynamicModel } from "../utils/collection";
import { z } from "zod";
import { ContentType } from "../models/content";

// const fieldsSchema = z.object({
//   name: z.string(),
//   type: z.string(),
//   required: z.string(),
// });

// const createCollectionDataSchema = z.object({
//   name: z.string(),
//   fields: z.array(fieldsSchema),
// });
// const updateCollectionDataSchema = createCollectionDataSchema.partial();

export async function action({ params, request }: ActionFunctionArgs) {
  const { type, id } = params;

  // Fetch the content type definition
  const contentType = await ContentType.findOne({ name: type });
  if (!contentType) {
    return Response.json(
      { error: `Content type not found for ${type}` },
      { status: 404 }
    );
  }

  // get the dynamic model and create a new record
  const DynamicModel = createDynamicModel(contentType.name, contentType.fields);

  const requestData = await request.json();

  const url = new URL(request.url);

  try {
    const method = request.method.toUpperCase();
    switch (method) {
      case "POST": {
        // const parsedData = createCollectionDataSchema.safeParse(requestData);
        // if (!parsedData.success) {
        //   return Response.json(
        //     { error: parsedData.error.format() },
        //     { status: 400 }
        //   );
        // }

        // const newRecord = new DynamicModel(parsedData.data);
        const newRecord = new DynamicModel(requestData);

        await newRecord.save();

        return Response.json(newRecord, { status: 201 });
      }
      case "PUT": {
        if (!id)
          return Response.json(
            { error: "ID is required for update record" },
            { status: 400 }
          );

        // const parsedData = updateCollectionDataSchema.safeParse(requestData);
        // if (!parsedData.success) {
        //   return Response.json(
        //     { error: parsedData.error.format() },
        //     { status: 400 }
        //   );
        // }

        const updatedRecord = await DynamicModel.findByIdAndUpdate(
          id,
          // parsedData.data,
          requestData,
          { new: true }
        );
        if (!updatedRecord)
          return Response.json(
            { error: `Record not found for ${type} with id: ${id}` },
            { status: 404 }
          );
        return Response.json({ data: updatedRecord });
      }
      case "DELETE": {
        if (!id)
          return Response.json(
            { error: "ID is required for deletion" },
            { status: 400 }
          );
        const deletedRecord = await DynamicModel.findByIdAndDelete(id);
        if (!deletedRecord)
          return Response.json(
            { error: `Record not found for ${type} with id: ${id}` },
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

  const { id, model } = params;

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const fields = url.searchParams.get("fields");

  const query: Record<string, any> = {};

  const projection = fields
    ? fields.split(",").reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    : null;

  try {
    if (!model) {
      return Response.json(
        { error: "Content type must be provided found" },
        { status: 404 }
      );
    }

    const contentType = await ContentType.findOne({ name: model });
    if (!contentType) {
      return Response.json(
        { error: "Content type not found" },
        { status: 404 }
      );
    }
    // get the dynamic model and  fetch data
    const DynamicModel = createDynamicModel(
      contentType.name,
      contentType.fields
    );

    if (id) {
      const data = await DynamicModel.findById(id);
      if (!data) {
        return Response.json({ error: "Document not found" }, { status: 404 });
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
  } catch (error) {
    logger(error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }

  return null;
}
