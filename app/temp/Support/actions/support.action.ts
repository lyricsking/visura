import { ActionFunction, json } from "@remix-run/node";
import formDataToObject from "~/utils/form-data-to-object";
import { createTicket } from "../server/ticket.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  let ticket = await createTicket(formObject);

  return json({ ticket });
};
