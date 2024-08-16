import { LoaderFunction, redirect, json } from "@remix-run/node";
import { getSession } from "~/utils/session";
import { getQuestion } from "../server/quiz.server";
import { getSessionUser } from "~/Auth/server/auth.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  let uid = params["uid"];
  if (!uid) return redirect("/quiz");

  const session = await getSession(request.headers.get("Cookie"));

  let rQuestion = await getQuestion(session, uid);
  if (!rQuestion) return redirect("/quiz");

  const { answer, page, pageCount, question, uid: currentUId } = rQuestion;  
  if (!question || !currentUId) {
    return redirect("/quiz");
  }
  let user = await getSessionUser(request);
  
  return json({ answer, page, pageCount, question, uid: currentUId, user:user });
};
