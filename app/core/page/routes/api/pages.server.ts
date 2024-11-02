import { LoaderFunctionArgs } from "@remix-run/node";
import { PageModel } from "../../models/page.model";
import { IPage } from "../../types/page";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import { handleResponse } from "~/core/utils/helpers";

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
