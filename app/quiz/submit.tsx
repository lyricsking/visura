import { createCart, recommendSupplements } from "./quiz.server";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { getSession } from "~/shared/utils/session";
import type { ISupplementModel } from "~/supplement/supplement.model";

export const action = async ({ request }: ActionFunctionArgs) => {
  //  Retrieve the submitted form quiz answers as json object
  const answers = await request.json();
  console.log(answers);

  const session = await getSession(request.headers.get("Cookie"));
    
  session.unset(GIDS_MAP_KEY)
  session.unset(ANSWER_KEY)
    
  const headers = {
    "Set-Cookie": await commitSession(session),
  };
    
  //  Validate answer here
  if (answers) {
    try {
      const supplements: ISupplementModel[] = await recommendSupplements(answers);

      if (Array.isArray(supplements) && supplements.length > 0) {
        await createCart(supplements);
        
        return json({ success: true, data: { answers }}, { headers });
      }
    } catch (error) {
      console.log(error);
      
      return json({ success: false, data: { answers }}, { headers });
    }
  }
  
  return json({ success: false, data: { answers }}, { headers });
};

export default function Submit() {
  return <div></div>;
}
