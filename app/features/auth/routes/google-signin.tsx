import { redirect, ActionFunctionArgs } from "react-router";
import { authenticate } from "../server/auth.server";

export let loader = () => redirect("/login");

export let action = async ({ request }: ActionFunctionArgs) => {
  return await authenticate("google", request);
};
