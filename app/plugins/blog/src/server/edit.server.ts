import { ActionFunctionArgs, json } from "@remix-run/node";
import { getAuthUser } from "~/auth/server/auth.server";
import formDataToObject from "~/utils/form-data-to-object";
import { createPost } from "./post.server";
import { Types } from "mongoose";
import { parseError } from "~/utils/mongoose";
import { PluginLoaderFunction } from "~/app";

export const action = async ({ request }: ActionFunctionArgs) => {
  let authUser = await getAuthUser(request);
  if (!authUser || !authUser.id) {
    // throw new Error("You are not authorised to perform this operation");
  }

  const formData = await request.formData();
  const formObject: any = formDataToObject(formData);
  console.log(Object.fromEntries(formData));

  // let title = formObject["title"];
  // let excerpt = formObject["excerpt"];
  // let content = formObject["content"];
  // let tags = formObject["tags"];
  // let featuredImage = formObject["featuredImage"];

  let response = await createPost({
    ...formObject,
    author: new Types.ObjectId(),
    published: false,
  });

  if (response.error) {
    const values = Object.fromEntries(formData);
    let errors = parseError(response.error);

    return json({ errors, values });
  }

  return json({ post: response.data });
};

export const loader: PluginLoaderFunction = () => {
  return async () => {};
};
