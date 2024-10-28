import { LoaderFunction } from "@remix-run/node";
import { authenticate } from "../server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticate("google", request);
};
