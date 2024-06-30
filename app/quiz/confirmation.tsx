import { ISupplement } from "~/supplement/supplement.type";
import { createCart, recommendSupplements } from "./quiz.server";
import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  // Handle server-side logic for form data

  //  Retrieve the submitted quiz answers as json object
  const body = await request.json();
  console.log("The body", body);
  
  //
  try {
    const supplements: ISupplement[] = await recommendSupplements(body);
      
    if (supplements) {
      await createCart(supplements);

      return json({ success: true });
    }
  } catch (error) {
    console.log(error);

    return json({
      success: false,
      message: "Failed to convert supplements into order.",
    });
  }
};

export default function Confirmation() {

  return <div></div>;
}
