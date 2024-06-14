import {getOrderId} from ".quiz.server.ts";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";

 /**
 * Form action called to handle quiz responses
 *
 * Send quiz response to server to generate recommendations and create order entry for the recommendations and returns database entry's id.
 */
export async function action({
  request,
}: ActionFunctionArgs) {
  //  Retrueve quiz response from form.
  const formData = await request.formData();
  //  Generate recommendation from the quiz responses and create an order entry
  const id = await getOrderId(formData);
  
  return json(
    { success: true, data: {id}},
    { headers: { "Set-Cookie": sessionPrep } }
  )
}
