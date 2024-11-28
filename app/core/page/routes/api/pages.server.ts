import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { PageModel } from "../../models/page.server";
import { IPage } from "../../types/page";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import { handleResponse } from "~/core/utils/helpers";
import formDataToObject from "~/core/utils/form-data-to-object";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const path = url.searchParams.get("path");

  const query: { path?: string } = {};

  if (path) query.path = path;

  let response: DBReponse<IPage[] | null> = await handleDbResult(
    PageModel.find(query)
  );

  return handleResponse<IPage[] | null>({
    ...response,
    statusCode: 200,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(formDataToObject(await request.formData()));
};
