import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator, redirectUrl } from "../server/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const rdrPath = await redirectUrl(request);

  const successRedirect = rdrPath; //  Get source url from request query params
  const failureRedirect = `/auth?rdr=${encodeURIComponent(rdrPath)}`;

  await authenticator.authenticate("google", request, {
    successRedirect,
    failureRedirect,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const rdrPath = await redirectUrl(request);

  const successRedirect = rdrPath; //  Get source url from request query params
  const failureRedirect = `/auth?rdr=${encodeURIComponent(rdrPath)}`;

  await authenticator.authenticate("google", request, {
    successRedirect,
    failureRedirect,
  });
};
