import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { PageStatus, PageContentType } from "~/core/types/page";
import { paginate } from "~/core/utils/http";
import { logger } from "~/core/utils/logger";
import { PageModel } from "../models/page.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const path = url.searchParams.get("path");
  const template = url.searchParams.get("template");
  const status = url.searchParams.get("status");

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const fields = url.searchParams.get("fields");

  //
  const query: Record<string, any> = {};

  if (path) query.path = path;
  if (template) query.isTemplate = template === "true";
  if (status) query.status = status as PageStatus;

  const projection = fields
    ? fields.split(",").reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    : null;

  const { id } = params;

  try {
    if (id) {
      const page = await PageModel.findById(id);
      if (!page)
        return Response.json({ error: "Page not found" }, { status: 404 });
      return Response.json(page);
    } else {
      const result = await paginate(PageModel, query, projection, page, limit);
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

const createPageSchema = z.object({
  path: z.string().min(3),
  metadata: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    keywords: z.string().optional(),
    openTags: z.array(z.any()),
  }),
  content: z.object({
    type: z.enum(PageContentType),
    value: z.any(),
  }),
  status: z.enum(Object.values(PageStatus) as any),
});
const updatePageSchema = createPageSchema.partial();

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const method = request.method.toUpperCase();
    switch (method) {
      case "POST": {
        const requestData = await request.json();
        const parsedData = createPageSchema.safeParse(requestData);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const newUser = new PageModel(parsedData.data);
        await newUser.save();

        return Response.json(newUser, { status: 201 });
      }
      case "PUT": {
        if (!id)
          return Response.json(
            { error: "ID is requuired for update" },
            { status: 400 }
          );
        const requestData = await request.json();

        const parsedData = updatePageSchema.safeParse(requestData);
        if (!parsedData.success) {
          return Response.json(
            { error: parsedData.error.format() },
            { status: 400 }
          );
        }

        const updatedData = await PageModel.findByIdAndUpdate(
          id,
          parsedData.data,
          { new: true }
        );
        if (!updatedData)
          return Response.json({ error: "Page not found" }, { status: 404 });
        return Response.json({ data: updatedData });
      }
      case "DELETE": {
        if (!id)
          return Response.json(
            { error: "ID is required for deletion" },
            { status: 400 }
          );
        const deletedUser = await PageModel.findByIdAndDelete(id);
        if (!deletedUser)
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
};
