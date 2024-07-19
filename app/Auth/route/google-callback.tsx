import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const successRedirect = "/";//  Get source url from request query params
  
  await authenticator.authenticate("google", request, {
    successRedirect,
    failureRedirect: "/login",
  });
};