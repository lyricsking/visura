import { ActionFunctionArgs, data, LoaderFunctionArgs } from "@remix-run/node";
import { PageModel } from "../../models/page.server";
import { IPage } from "../../types/page";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import { handleResponse } from "~/core/utils/helpers";
import formDataToObject from "~/core/utils/form-data-to-object";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const path = url.searchParams.get("path");
  const template = url.searchParams.get("template") === "true";

  const query: { path?: string; isTemplate?: boolean; isActive?: boolean } = {};

  if (path) query.path = path;
  if (template) query.isTemplate = template;
  if (!template) query.isActive = true;
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
