import { redirect, ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../server/auth.server";

export let loader = () => redirect("/login");

export let action = async ({ request }: ActionFunctionArgs) => {
  return await authenticate("google", request);
};
