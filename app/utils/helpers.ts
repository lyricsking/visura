import { json, redirect } from "@remix-run/node";
import { REDIRECT_SEARCH_PARAM } from "~/core/auth/server/auth.server";

export function isApiRequest(request: Request): boolean {
  // Check if the `Accept` header is set to JSON
  return (
    request.headers.get("accept") === "application/json" ||
    request.headers.get("content-type") === "application/json"
  );
}

export function unauthorizedResponse() {
  return json(
    {
      success: false,
      error: "Unauthorized",
      message:
        "You are not authorized to access this resource. Please log in and try again.",
    },
    { status: 401 }
  );
}

export function unauthorizedBrowserResponse(currentUrl: URL) {
  const loginRoute = new URL("/auth", currentUrl.origin);
  loginRoute.searchParams.set(
    REDIRECT_SEARCH_PARAM,
    encodeURIComponent(currentUrl.toString())
  );
  return redirect(loginRoute.toString(), {
    status: 302,
  });
}
