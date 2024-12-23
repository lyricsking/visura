import { ActionFunction, json } from "react-router";
import formDataToObject from "~/shared/utils/form-data-to-object";
import { createTicket } from "../server/ticket.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  let ticket = await createTicket(formObject);

  return json({ ticket });
};
