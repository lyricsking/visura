import { ActionFunction, json } from "@remix-run/node";
import { getSession, commitSession } from "~/utils/session";
import { initQuiz } from "../server/quiz.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  let uid = initQuiz(session);
  return json(
    { uid },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};
