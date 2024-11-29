import {
  data as dataFn,
  redirect,
  Session,
  TypedResponse,
} from "@remix-run/node";
import { REDIRECT_SEARCH_PARAM } from "~/auth/server/auth.server";
import { commitSession, getSession } from "./session";

export type ApiResponse<T> = {
  data?: T;
  error?: string | string[] | { [key: string]: any };
  success: boolean;
  statusCode: number;
};

export type ApiFunctionArgs<T> = {
  data?: T | null;
  error?: { [key: string]: any };
  statusCode: number;
  statusText?: string;
};

export function handleResponse<T>({
  data,
  error,
  statusCode,
  statusText,
}: ApiFunctionArgs<T>) {
  const responsePayload: ApiResponse<T> = {
    data: data || undefined,
    error: error || undefined,
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
  };

  // Return JSON for API requests
  return dataFn<ApiResponse<T>>(responsePayload, {
    status: statusCode,
    statusText,
  });
}

export function isApiRequest(request: Request): boolean {
  // Check if the `Accept` header is set to JSON
  return (
    request.headers.get("accept") === "application/json" ||
    request.headers.get("content-type") === "application/json"
  );
}

export function unauthorizedResponse() {
  return dataFn(
    {
      success: false,
      error: "Unauthorized",
      message:
        "You are not authorized to access this resource. Please log in and try again.",
    },
    { status: 401 }
  );
}

export function apiSuccessResponse(data: any, status = 200) {
  return dataFn(
    {
      success: true,
      data,
    },
    { status }
  );
}

export async function unauthorizedBrowserResponse(
  currentUrl: URL,
  session: Session
) {
  const loginRoute = new URL("/auth", currentUrl.origin);
  loginRoute.searchParams.set(
    REDIRECT_SEARCH_PARAM,
    encodeURIComponent(currentUrl.toString())
  );
  return redirect(loginRoute.toString(), {
    status: 302,
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
