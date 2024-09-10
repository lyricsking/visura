import { ActionFunction, json } from "@remix-run/node";
import { getSession, commitSession } from "~/utils/session";
import { saveQuizAnswer } from "../server/quiz.server";

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const session = await getSession(request);

  //  Retrieve the submitted form quiz answers as json object
  const { uid, answer } = await request.json();

  let nextUId = await saveQuizAnswer(session, uid, answer);

  let headers = {
    "Set-Cookie": await commitSession(session),
  };
  if (nextUId) {
    if (typeof nextUId === "number") {
      return json({ success: true, uid: null }, { headers });
    }
    return json({ success: true, uid: nextUId }, { headers });
  }

  return json({ success: false }, { headers });
};
