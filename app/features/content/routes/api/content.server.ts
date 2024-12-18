import { ActionFunctionArgs, data, LoaderFunctionArgs } from "@remix-run/node";
import { ContentType } from "../../models/content.server";
import { logger } from "~/shared/utils/logger";
import { paginate } from "~/shared/utils/http";


export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST")
    return Response.json({ error: "Method not allowed" }, { status: 405 });

  const body = await request.json();
  if (!body.name || !Array.isArray(body.fields))
    return Response.json({ error: "Invalid data" }, { status: 400 });

  try {
    const contentType = new ContentType({
      name: body.name,
      fields: body.fields,
    });

    await contentType.save();

    return Response.json({
      message: "Content type created",
      data: contentType,
    });
  } catch (error) {
    logger(error);

    return Response.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}

export async function loader({ params, request }: LoaderFunctionArgs) {
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
