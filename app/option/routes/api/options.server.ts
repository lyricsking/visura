import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { OptionModel } from "../../models/option.server";
import { getUserFromSession } from "~/core/user/server/user.server";
import { DBReponse, handleDbResult } from "~/core/utils/mongoose";
import { UpdateWriteOpResult } from "mongoose";
import { handleResponse } from "~/core/utils/helpers";
import { APP_NAME } from "~/app";
import { DISPLAY_OPTION_KEY, IOption } from "../../types/option";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let response: DBReponse<IOption[] | null>;

  if (process.env.NODE_ENV != "production") {
    const appOption = new OptionModel({
      name: APP_NAME,
      value: "Test App",
    });

    const displayOption = new OptionModel({
      name: DISPLAY_OPTION_KEY,
      value: {
        homepage: {
          type: "static",
          path: "/",
        },
      },
    });

    response = { data: [appOption, displayOption] };
  } else {
    const url = new URL(request.url);

    const name = url.searchParams.get("name");

    const query: { name?: string } = {};

    if (name) query.name = name;

    response = await handleDbResult(OptionModel.find(query));
  }

  return handleResponse<IOption[] | null>({
    ...response,
    statusCode: 200,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await getUserFromSession(request);

  let userId = user?.id;

  const jsonData = await request.json();

  const name = jsonData["name"];
  const value = jsonData["value"];

  let response: DBReponse<UpdateWriteOpResult | null> = await handleDbResult(
    OptionModel.updateOne({ name }, { name, value: value }).exec()
  );

  return handleResponse<UpdateWriteOpResult | null>({
    ...response,
    statusCode: 200,
  });
};
