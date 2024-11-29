import { ActionFunctionArgs, data, LoaderFunctionArgs } from "@remix-run/node";
import { PageModel } from "../../models/page.server";
import { IPage, PageStatus } from "../../types/page";
import { DBReponse, handleDbResult } from "~/utils/mongoose";
import { handleResponse } from "~/utils/helpers";
import formDataToObject from "~/utils/form-data-to-object";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const path = url.searchParams.get("path");
  const template = url.searchParams.get("template") === "true";
  const status = url.searchParams.get("status");

  const query: { path?: string; isTemplate?: boolean; status?: PageStatus } =
    {};

  if (path) query.path = path;
  if (template) query.isTemplate = template;
  if (status && !template) query.status = (status as PageStatus) || "active";

  console.log(query);

  let response: DBReponse<IPage[] | null> = await handleDbResult(
    PageModel.find(query)
  );

  return data({ ...response }, { status: 200 });
  return handleResponse<IPage[] | null>({
    ...response,
    statusCode: 200,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const dataObject = formDataToObject(formData);

  const tags = dataObject["tags"];

  new PageModel({
    path: dataObject["title"],
    metadata: {
      title: dataObject["title"],
      description: dataObject["description"],
      ...(tags && { ...tags }),
    },
    content: {
      type: dataObject["type"],
      value: dataObject["value"],
    },
  }).save();

  console.log(dataObject);

  return null;
};
