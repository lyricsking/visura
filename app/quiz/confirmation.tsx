import { createCart, recommendSupplements } from "./quiz.server";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { getSession } from "~/shared/utils/session";
import type { ISupplementModel } from "~/supplement/supplement.model";

export const action = async ({ request }: ActionFunctionArgs) => {
  // Handle server-side logic for form data
  const url = new URL(request.url);
  const isFinished = url.searchParams.get("finished");
  
  const session = await getSession(request.headers.get("Cookie"));

  if (isFinished && body) {
    session.unset(GIDS_MAP_KEY);
    session.unset(ANSWER_KEY);

    return redirect("/quiz/confirm", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  //  Validate answer here
  if (isFinished && answers) {
    try {
      const supplements: ISupplementModel[] = await recommendSupplements(
        answers
      );

      if (Array.isArray(supplements) && supplements.length > 0) {
        await createCart(supplements);

        return redirect("/cart");
      }
    } catch (error) {
      console.log(error);

      return redirect("/quiz");
    }
  }
};

export default function Confirmation() {
  return <div></div>;
}
